import { capitalizeFirstLetter } from 'src/utils/string'
import { AlertInfoIcon, AlertWarningIcon } from '../Icons/icons'

interface ComponentProps {
  itemName: string
}

// export const CellEmpty = (props: ComponentProps) => {
//   const { itemName } = props
//   return (
//     <div className="alert alert-warning shadow-lg max-w-md">
//       <div>
//         <AlertWarningIcon />
//         <span>{`No ${capitalizeFirstLetter(itemName)}, Much Empty :/`}</span>
//       </div>
//     </div>
//   )
// }

export const CellEmptyInfo = (props: ComponentProps) => {
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

export const CellEmpty = CellEmptyInfo
