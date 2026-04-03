// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serialize(obj: Record<string, any>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v instanceof Date ? v.toISOString() : v])
  );
}
