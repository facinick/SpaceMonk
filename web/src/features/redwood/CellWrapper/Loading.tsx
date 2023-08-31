import { Center } from "src/utils/react"

interface ComponentProps {}

export const CellLoading = (props: ComponentProps) => {
  return <Center><progress className="progress progress-primary w-56" /></Center>
}
