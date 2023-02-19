export const isNumber = (maybeNumber: unknown): boolean => {
  return Number.isFinite(maybeNumber)
}
