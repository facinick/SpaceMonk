export const wait = async ({ seconds }: { seconds: number }) => new Promise(resolve => setTimeout(resolve, seconds * 1000))
