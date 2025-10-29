import { StandingsType } from "@/app/types/StandingsType"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest,{params}:{params:{id:string}}) => {
  const { id } = params
  const res = await fetch(`https://api.football-data.org/v4/competitions/${id}/standings`,{
    headers:{
      'X-Auth-Token': process.env.API_KEY as string,
    },
    next:{
      revalidate:60 * 60 * 24,
    }
  })
  const data:StandingsType = await res.json()
  return NextResponse.json(data,{status:200})
}