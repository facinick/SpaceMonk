import { capitalizeFirstLetter } from 'src/utils/string'
import { AlertInfoIcon } from '../../Icons/icons'

interface ComponentProps {
  itemName: string
}

export const CellEmpty = (props: ComponentProps) => {
  const { itemName } = props
  return (
    <div className="alert alert-info max-w-md shadow-lg">
      <div>
        <AlertInfoIcon />
        <span>{`No ${capitalizeFirstLetter(itemName)}, Much Empty :/`}</span>
      </div>
    </div>
  )
}
