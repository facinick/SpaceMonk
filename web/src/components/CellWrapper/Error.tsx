import { AlertErrorIcon, AlertWarningIcon } from '../Icons/icons'

interface ComponentProps {
  message: string
}

export const CellError = (props: ComponentProps) => {
  const { message } = props
  return (
    <div className="alert alert-error max-w-md shadow-lg">
      <div>
        <AlertErrorIcon />
        <span>{message}</span>
      </div>
    </div>
  )
}
