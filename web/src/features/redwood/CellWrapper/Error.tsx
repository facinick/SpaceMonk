import { Center } from 'src/utils/react'
import { AlertErrorIcon } from '../../Icons/icons'

interface ComponentProps {
  message: string
}

export const CellError = (props: ComponentProps) => {
  const { message } = props
  return (
    <Center><div className="alert alert-error max-w-md shadow-lg">
      <div>
        <AlertErrorIcon />
        <span>{message}</span>
      </div>
    </div>
    </Center>
  )
}
