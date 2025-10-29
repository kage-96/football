'use client'
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Button } from "../_components/Button";
import { useFetcher } from "../_hooks/useFetcher";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import Image from "next/image";
import Link from "next/link";

interface FavoriteTeamItem { 
  id:number;
  email:string
    favorites:Array<{
      team:{
        id:number;
        shortName:string;
        crestUrl:string | null 
      }
    }>
  }

export default function Account(){
  const [email, setEmail] = useState<string | null>(null)
  const {session} = useSupabaseSession();
  const userId = session?.user.id
  
  const {data,isLoading,error} = useFetcher<FavoriteTeamItem>({
    url:userId ? `/api/users/${userId}/`:'',
    method:"GET"
  })

  useEffect(() => {
    if(data?.email){
      setEmail(data.email)
    }
  },[data])
  console.log(data?.favorites)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return(
    <div className="max-w-[400px] mx-auto">
      <div className="mb-8">
        <label htmlFor="email" className="mb-2">ユーザー名</label>
        <input id='email' className="w-full border p-2 rounded" type="text" value={email ?? ''} readOnly />
      </div>
      <div className="mb-8">
        <p>お気に入りチーム({data?.favorites?.length ?? 0})</p>
        {isLoading && <p>読み込み中...</p>}

            {data?.favorites?.length === 0 && <p>お気に入りチームはありません。</p>}

            <ul>
              {data?.favorites.map((fav) => (
               <li key={fav.team.id} className="flex items-center justify-between mb-2">
                  <Link href={`/teams/${fav.team.id}`} className="flex items-center">
                  {fav.team.crestUrl ? (
                   <Image src={fav.team.crestUrl} alt={fav.team.shortName} width={40} height={40} />
                  ) : (
                    <div style={{width:40,height:40,backgroundColor:'#eee'}} />
                  )}
                 {fav.team.shortName}
                  </Link>
                  <button
                    type='button'
                    className="bg-red-700 text-white py-1.5 px-4 rounded text-sm" >
                    解除
                  </button>

                </li>
              ))}
            </ul>
            
        </div>

      <div>
        <Button type='button' onClick={handleLogout} text='ログアウト' />
      </div>
    </div>
  )
}