export type Point = { x: number; y: number };

export type Segment =
  | { kind: "move"; to: Point }
  | { kind: "line"; to: Point }
  | { kind: "curve"; control1: Point; control2: Point; to: Point }
  | { kind: "close" };

type Token = { command: string; values: number[] };

const ARGUMENTS: Record<string, number> = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0,
};

export function tokenize(data: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /(-?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?)|([A-Za-z])/g;
  let command: string | null = null;
  let values: number[] = [];

  const flush = () => {
    if (command === null) return;
    const arity = ARGUMENTS[command.toUpperCase()];

    if (arity === 0) {
      tokens.push({ command, values: [] });
      return;
    }

    if (values.length === 0 || values.length % arity !== 0) {
      throw new Error(`path: ${command} takes ${arity} values, got ${values.length}`);
    }

    for (let index = 0; index < values.length; index += arity) {
      const slice = values.slice(index, index + arity);
      tokens.push({ command: index === 0 ? command : implicit(command), values: slice });
    }
  };

  for (const match of data.matchAll(pattern)) {
    if (match[2]) {
      flush();
      command = match[2];
      values = [];
      if (ARGUMENTS[command.toUpperCase()] === undefined) {
        throw new Error(`path: unsupported command ${command}`);
      }
      continue;
    }
    if (command === null) throw new Error("path: a number before any command");
    values.push(Number(match[1]));
  }

  flush();
  return tokens;
}

const implicit = (command: string): string =>
  command === "M" ? "L" : command === "m" ? "l" : command;

function arcToCurves(from: Point, values: number[], to: Point): Segment[] {
  const [rxRaw, ryRaw, degrees, largeArc, sweep] = values;

  if (from.x === to.x && from.y === to.y) return [];
  if (rxRaw === 0 || ryRaw === 0) return [{ kind: "line", to }];

  let rx = Math.abs(rxRaw);
  let ry = Math.abs(ryRaw);
  const phi = (degrees * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);

  const dx = (from.x - to.x) / 2;
  const dy = (from.y - to.y) / 2;
  const x1 = cos * dx + sin * dy;
  const y1 = -sin * dx + cos * dy;

  const oversize = (x1 * x1) / (rx * rx) + (y1 * y1) / (ry * ry);
  if (oversize > 1) {
    const scale = Math.sqrt(oversize);
    rx *= scale;
    ry *= scale;
  }

  const numerator = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1;
  const denominator = rx * rx * y1 * y1 + ry * ry * x1 * x1;
  const factor = (largeArc === sweep ? -1 : 1) * Math.sqrt(Math.max(0, numerator) / denominator);

  const cx1 = (factor * rx * y1) / ry;
  const cy1 = (-factor * ry * x1) / rx;
  const cx = cos * cx1 - sin * cy1 + (from.x + to.x) / 2;
  const cy = sin * cx1 + cos * cy1 + (from.y + to.y) / 2;

  const angle = (ux: number, uy: number, vx: number, vy: number) => {
    const dot = ux * vx + uy * vy;
    const length = Math.sqrt((ux * ux + uy * uy) * (vx * vx + vy * vy));
    const sign = ux * vy - uy * vx < 0 ? -1 : 1;
    return sign * Math.acos(Math.min(1, Math.max(-1, dot / length)));
  };

  const start = angle(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry);
  let sweepAngle = angle((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry);

  if (sweep === 0 && sweepAngle > 0) sweepAngle -= 2 * Math.PI;
  if (sweep === 1 && sweepAngle < 0) sweepAngle += 2 * Math.PI;

  const steps = Math.max(1, Math.ceil(Math.abs(sweepAngle) / (Math.PI / 2)));
  const step = sweepAngle / steps;
  const alpha = (4 / 3) * Math.tan(step / 4);

  const at = (theta: number): Point => ({
    x: cx + rx * cos * Math.cos(theta) - ry * sin * Math.sin(theta),
    y: cy + rx * sin * Math.cos(theta) + ry * cos * Math.sin(theta),
  });

  const derivative = (theta: number): Point => ({
    x: -rx * cos * Math.sin(theta) - ry * sin * Math.cos(theta),
    y: -rx * sin * Math.sin(theta) + ry * cos * Math.cos(theta),
  });

  const segments: Segment[] = [];
  for (let index = 0; index < steps; index += 1) {
    const from_ = start + index * step;
    const to_ = from_ + step;
    const a = at(from_);
    const b = at(to_);
    const da = derivative(from_);
    const db = derivative(to_);

    segments.push({
      kind: "curve",
      control1: { x: a.x + alpha * da.x, y: a.y + alpha * da.y },
      control2: { x: b.x - alpha * db.x, y: b.y - alpha * db.y },
      to: index === steps - 1 ? to : b,
    });
  }

  return segments;
}

export function parsePath(data: string): Segment[] {
  const segments: Segment[] = [];
  let current: Point = { x: 0, y: 0 };
  let start: Point = { x: 0, y: 0 };
  let lastControl: Point | null = null;

  for (const { command, values } of tokenize(data)) {
    const relative = command === command.toLowerCase();
    const absolute = command.toUpperCase();
    const base = relative ? current : { x: 0, y: 0 };
    const point = (x: number, y: number): Point => ({ x: base.x + x, y: base.y + y });

    if (absolute === "Z") {
      segments.push({ kind: "close" });
      current = start;
      lastControl = null;
      continue;
    }

    if (absolute === "M") {
      current = point(values[0], values[1]);
      start = current;
      segments.push({ kind: "move", to: current });
      lastControl = null;
      continue;
    }

    if (absolute === "L" || absolute === "H" || absolute === "V") {
      current =
        absolute === "L"
          ? point(values[0], values[1])
          : absolute === "H"
            ? { x: base.x + values[0], y: current.y }
            : { x: current.x, y: base.y + values[0] };
      segments.push({ kind: "line", to: current });
      lastControl = null;
      continue;
    }

    if (absolute === "C" || absolute === "S") {
      const control1 =
        absolute === "C"
          ? point(values[0], values[1])
          : lastControl
            ? { x: 2 * current.x - lastControl.x, y: 2 * current.y - lastControl.y }
            : current;
      const control2 = absolute === "C" ? point(values[2], values[3]) : point(values[0], values[1]);
      const to = absolute === "C" ? point(values[4], values[5]) : point(values[2], values[3]);

      segments.push({ kind: "curve", control1, control2, to });
      lastControl = control2;
      current = to;
      continue;
    }

    if (absolute === "A") {
      const to = point(values[5], values[6]);
      segments.push(...arcToCurves(current, values, to));
      current = to;
      lastControl = null;
      continue;
    }

    throw new Error(`path: ${command} is not supported by this generator`);
  }

  return segments;
}
