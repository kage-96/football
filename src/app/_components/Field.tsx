
interface Props {
  htmlFor_inputId:string
  labelTxt:string
  type:string
  placeholder:string
  value:string
  onChange:(value:string) => void
}

 export const Field = ({htmlFor_inputId,labelTxt,type,placeholder,value,onChange}:Props) => {
  return(
    <div className="mb-2">
      <label htmlFor={htmlFor_inputId} className="text-gray-800 text-sm">{labelTxt}</label>
      <input
        type={type}
        id={htmlFor_inputId}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-50 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border w-full p-2 rounded-md text-sm text-gray-800 block "
      />
  </div>
  )
 }