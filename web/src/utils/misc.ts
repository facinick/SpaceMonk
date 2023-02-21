export const wait = async ({ seconds }: { seconds: number }) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

function getCurrentUTCTime(): Date {
  return new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDay(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    )
  )
}

export { debounce, getCurrentUTCTime }
