'use client';

import { useFetcher } from "@/app/_hooks/useFetcher";
import { MatchType } from "@/app/types/MatchType";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Matches() {
  const {id} = useParams()

  const {data,isLoading,error} = useFetcher<MatchType>({
    url:`/api/competitions/${id}/matches`,
    method:"GET"
  })

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>データなし</p>
  
  return (
      <div>
        <div className="flex items-center mb-4">
          <Image
            src={data.competition.emblem}
            alt={data.competition.name}
            width={70}
            height={70} 
            priority
            />
        </div>
          <div className="grid gap-4">
            {data.matches.map((match) => {
              return (
                <div key={match.id} className="grid grid-rows:1 grid-cols-[80px_1fr_30px_1fr]  items-center border-b pb-2 px-2">
                  <div>
                    <p className="text-sm">{new Date(match.utcDate).toLocaleString('ja-JP')}</p>
                  </div>
                    <div className="md:flex items-center w-full">
                      <Image className="block mx-auto md:mx-0 md:mr-2" src={match.homeTeam.crest} alt={match.homeTeam.shortName} width={40} height={40} />                
                      <p className="text-sm text-center sm:block">{match.homeTeam.shortName}</p>
                    </div>

                    <div>
                      <p className="text-xs">vs</p>
                    </div>

                    <div className="md:flex items-center w-full">
                      <Image className="block mx-auto md:mx-0 md:mr-2" src={match.awayTeam.crest} alt={match.awayTeam.shortName} width={40} height={40} />                
                      <p className="text-sm text-center sm:block">{match.awayTeam.shortName}</p>
                    </div>

                </div>
              )
            })}
          </div>
      </div>
  )
}