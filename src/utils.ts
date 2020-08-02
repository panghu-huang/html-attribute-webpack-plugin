export function isObject(obj: unknown): obj is object {
  return !!obj && typeof obj === 'object';
}