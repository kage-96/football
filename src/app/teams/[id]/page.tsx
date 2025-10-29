'use client'
import { useFetcher } from "@/app/_hooks/useFetcher"
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Data {
  name:string
  crest:string
  website:string
  squad:Array<{
    dateOfBirth: string
    id: number,
    name: string
    position:string
  }>
}

export default function Teams() {
  const {id} = useParams()
  const {token,session} = useSupabaseSession();

  const {data,isLoading,error} = useFetcher<Data>({
    url:`/api/teams/${id}`,
    method:"GET"
  })

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>データなし</p>
  console.log(data)

  const registerTeam = async(id:number,shortName:string,crestUrl:string) => {
    if(!token) return
    try{

      const res = await fetch(`/api/teams`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": token,
        },
        body:JSON.stringify({id,shortName,crestUrl}),
      })

      if(res.ok){
        alert('チームを登録しました。')
        handleFavorite(id);
      }
      
    }catch(err){
      console.error(err)
    }
    
  }

  const handleFavorite = async(id:number) => {
    if(!token) return
    try{
      const res = await fetch('/api/favorites',{
        method:"POST",
        body: JSON.stringify({teamId:id}),
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token,
       },
        credentials: "include",
      })

      console.log(res)
      if(res.status == 200){
        alert("お気に入り登録しました。");
      }else{
        alert('お気に入りの登録に失敗しました。')
      }

    }catch(err){
      alert('お気に入りの登録中にエラーが発生しました。')
      console.log(err)
    }
  }

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex items-center justify-between  mb-4">
        <div className="flex items-center">
          <Image src={data.crest} alt={data.name} width={50} height={50} />
          <h1 className="text-2xl font-bold ml-2">{data.name}</h1>
        </div>
        {session && (

          <button
          type="button"
          className='bg-blue-500 py-2 px-4 text-md text-white rounded-md hover:bg-blue-800'
          onClick={() => registerTeam(Number(id),data.name,data.crest)}>
            お気に入り
          </button>
      )
    }
    </div>
    
    {data.squad.map((sq) => {
      return (
          <Link href={`/persons/${sq.id}`} className="text-left p-2 mb-1 border-b border-gray-200 flex" key={sq.id}>
            <p className="text-lg  font-bold truncate">{sq.name}</p>
          </Link>
      )
    })}
    </div>
  )
}