export const isNumber = (maybeNumber: unknown): boolean => {
  return Number.isFinite(maybeNumber)
}

export const isBetween = ({
  value,
  lower,
  upper,
  inclusive = true,
}: {
  value: number
  lower: number
  upper: number
  inclusive?: boolean
}): boolean => {
  if (lower >= upper) {
    throw new Error(
      `lower value can't be greater than upper value: lower:${lower} upper:${upper}`
    )
  }
  if (inclusive) return value <= upper && value >= lower

  return value < upper && value > lower
}
