'use client';

import { useFetcher } from "@/app/_hooks/useFetcher";
import { ScorersType } from "@/app/types/ScorersType";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Scorers() {
  const {id} = useParams()

  const {data,isLoading,error} = useFetcher<ScorersType>({
    url:`/api/competitions/${id}/scorers`,
    method:"GET"
  })

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>データなし</p>
  
  return (
    <div>
      <div className="max-w-[600px] mx-auto">
        <div className="flex items-center mb-4">
          <Image
            src={data.competition.emblem}
            alt={data.competition.name}
            width={70}
            height={70} 
            priority
            />
        </div>

        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <th colSpan={2} className="w-[80%] text-left border-b">選手</th>
              <th className="w-[10%] border-b">G</th>
              <th className="w-[10%] border-b">A</th>
            </tr>

      
      {data.scorers.map((scorer,i) => {
        return (
            <tr key={scorer.player.id} className={`${i % 2 === 1 && 'bg-gray-200'} `}>
              <td className="text-center p-2">
                <Image
                  src={scorer.team.crest}
                  alt={scorer.team.name}
                  width={30}
                  height={30}
                  />
              </td>
              <td className="md:w-[400px] truncate p-2">
                <span className="text-lg font-bold">{scorer.player.name}</span>
                <br />
                <span className="text-sm">({scorer.team.name})</span>
              </td>
              <td className="text-center p-2">{scorer.goals}</td>
              <td className="text-center p-2">{scorer.assists ?? 0 }</td>
            </tr>
        )
      })}
         </tbody>
        </table>
      </div>
    </div>
  )
}