import { describe, expect, it } from "vitest";

import {
  NOTICE_BORDER_OPACITY,
  NOTICE_TONES,
  noticeStyle,
  type NoticeTone,
} from "../src/molecules/banner/notice-style";
import { statCardStep } from "../src/molecules/stat-card/stat-card-style";
import {
  STEP_STATES,
  STEP_TOKENS,
  stepState,
  type StepState,
} from "../src/molecules/stepper/stepper-style";
import { darkTokens, lightTokens } from "../src/tokens/theme";

const TONES = Object.keys(NOTICE_TONES) as NoticeTone[];

describe("the notice tones", () => {
  it("carries the four tones the contract names", () => {
    expect(TONES).toEqual(["info", "ok", "warn", "danger"]);
  });

  it("pairs each tone with its own soft background", () => {
    expect(NOTICE_TONES).toEqual({
      info: { foreground: "info", background: "info-soft" },
      ok: { foreground: "ok", background: "ok-soft" },
      warn: { foreground: "warn", background: "warn-soft" },
      danger: { foreground: "danger", background: "danger-soft" },
    });
  });

  it("keeps the text readable against its own background in both schemes", () => {
    for (const tokens of [lightTokens, darkTokens]) {
      for (const tone of TONES) {
        const style = noticeStyle(tokens, tone);
        expect(style.title.color).not.toBe(style.container.backgroundColor);
      }
    }
  });

  it("draws the border from the text color rather than a new one", () => {
    expect(NOTICE_BORDER_OPACITY).toBe(0.4);
    for (const tone of TONES) {
      const style = noticeStyle(lightTokens, tone);
      expect(style.container.borderColor).toBe(style.title.color);
    }
  });

  it("pads on the spacing scale", () => {
    const style = noticeStyle(lightTokens, "info").container;
    expect(style.paddingHorizontal).toBe(16);
    expect(style.paddingVertical).toBe(12);
  });
});

describe("StatCard", () => {
  it("shrinks the value step as the value grows", () => {
    expect(statCardStep("42")).toBe("2xl");
    expect(statCardStep("1234567")).toBe("2xl");
    expect(statCardStep("12345678")).toBe("lg");
    expect(statCardStep("123456789012")).toBe("lg");
    expect(statCardStep("1234567890123")).toBe("sm");
    expect(statCardStep("")).toBe("2xl");
  });
});

describe("Stepper", () => {
  it("reads a step's state from its index against the current one", () => {
    expect(stepState(0, 1)).toBe("done");
    expect(stepState(1, 1)).toBe("current");
    expect(stepState(2, 1)).toBe("todo");
    expect(stepState(0, 0)).toBe("current");
  });

  it("marks only the untouched steps as muted", () => {
    expect(STEP_STATES).toEqual(["done", "current", "todo"]);
    expect(STEP_TOKENS.todo.dot).toBe("raised");
    expect(STEP_TOKENS.todo.label).toBe("ink-muted");
    for (const state of ["done", "current"] as StepState[]) {
      expect(STEP_TOKENS[state].dot).toBe("accent");
    }
  });
});
