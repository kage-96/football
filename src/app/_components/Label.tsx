import { ComponentProps, FC } from "react"

type Props = ComponentProps<'label'>;

export const Label:FC<Props> = ({...props}) => {
  return(
    <label {...props} className="text-gray-800 text-sm"></label>
  )
}