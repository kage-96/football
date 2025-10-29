import { ComponentProps, FC } from "react"

interface Props extends ComponentProps<'button'> {
  text:string
}

export const Button:FC<Props> = ({text,...props}) => {
  return(
    <button
      {...props}
      className="bg-blue-600 mt-2 py-2 px-4 text-white rounded-xl hover:bg-blue-800 w-full"
      >
      {text}
    </button>
  )
}