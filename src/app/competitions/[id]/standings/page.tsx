'use client';

import { useFetcher } from "@/app/_hooks/useFetcher";
import { StandingsType } from "@/app/types/StandingsType";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Standings() {
  const {id} = useParams()

  const {data,isLoading,error} = useFetcher<StandingsType>({
    url:`/api/competitions/${id}/standings`,
    method:"GET"
  })

  if(isLoading) return <p>読み込み中...</p>
  if(error) return <p>エラー:{error.message}</p>
  if(!data) return <p>データなし</p>
  
  return (
    <div>
      <div className="max-w-[800px] mx-auto">
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
            <th className="border-b text-left" colSpan={3}>チーム</th>
            <th className="border-b">勝点</th>
            <th className="border-b">W</th>
            <th className="border-b">D</th>
            <th className="border-b">L</th>
          </tr>

      {data.standings[0].table.map((standing,i) => {
        return (
          <tr key={standing.team.id} className={`${i % 2 === 1 && 'bg-gray-200'}`}>
            <td className="text-center border-b py-2">
              {standing.position < 10 ? `0${standing.position} ` : standing.position}
            </td>
            <td className="border-b w-[40px]">
              <Image
                src={standing.team.crest}
                alt={standing.team.shortName}
                width={30}
                height={30} />
            </td>
            <td className="border-b py-2">
              <Link
              href={`/teams/${standing.team.id}`}
              className="block"
              >
                {standing.team.shortName}
              </Link>
              </td>
              <td className="text-center font-bold border-b py-2">{standing.points}</td>
              <td className="text-center border-b py-2">{standing.won}</td>
              <td className="text-center border-b py-2">{standing.draw}</td>
              <td className="text-center border-b py-2">{standing.lost}</td>
            
          </tr>
        )
      })}
        </tbody>
        </table>
      </div>
    </div>
  )
}