'use client'
import { useFetcher } from "@/app/_hooks/useFetcher"
import { UsersType } from "@/app/types/UsersType"

export default function Users(){

  const {data,isLoading,error} = useFetcher<UsersType>({
    url:'/api/admin/users',
    method:"GET",
  })

  console.log(data)

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>ユーザーがいません。</p>

  return(
    <>
    {data.users.map((user) => {
      return(
        <div className="flex" key={user.id}>
          {/* <p className="mr-2">{user.email}</p> */}
          {/* <p className="mr-2">{new Date(user.createdAt).toLocaleDateString('ja-JP')}</p> */}
          {/* <p>{user.favorites[0]?.team.shortName}</p> */}
        </div>
      )
    })}
    </>
  )
}