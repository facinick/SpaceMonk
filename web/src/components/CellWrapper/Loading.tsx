import { AlertWarningIcon } from '../Icons/icons'

interface ComponentProps {}

export const CellLoading = (props: ComponentProps) => {
  return (
    <div className="alert alert-warning max-w-md shadow-lg">
      <div>
        <progress className="progress w-56"></progress>
        <span>{`Loading...`}</span>
      </div>
    </div>
  )
}
