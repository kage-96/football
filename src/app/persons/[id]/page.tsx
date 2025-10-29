'use client'
import { useFetcher } from "@/app/_hooks/useFetcher"
import { PersonsType } from "@/app/types/PersonsType"
import { useParams } from "next/navigation"

export default function Persons(){
  const {id} = useParams()

  const {data,isLoading,error} = useFetcher<PersonsType>({
    url:`/api/persons/${id}`,
    method:"GET"
  })

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>データなし</p>

  return(
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold ml-2">{data.name}</h1>
      </div>
      <ul className="p-2">
        <li className="p-2 border-b">生年月日:{data.dateOfBirth}</li>
        <li className="p-2 border-b">ポジション:{data.section}</li>
        <li className="p-2 border-b">背番号:{data.shirtNumber}</li>
        <li className="p-2 border-b">国籍:{data.nationality}</li>
      </ul>
    </div>
  )
}