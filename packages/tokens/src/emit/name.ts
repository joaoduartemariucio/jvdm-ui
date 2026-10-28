const SPELLED: Record<string, string> = { "2xs": "xxs", "2xl": "xxl" };

export function identifier(name: string): string {
  const spelled = SPELLED[name] ?? name;
  const [head, ...rest] = spelled.split("-");
  return head + rest.map((part) => part[0].toUpperCase() + part.slice(1)).join("");
}

export function typeName(name: string): string {
  const id = identifier(name);
  return id[0].toUpperCase() + id.slice(1);
}

export function constantName(name: string): string {
  return (SPELLED[name] ?? name).replace(/-/g, "_").toUpperCase();
}
