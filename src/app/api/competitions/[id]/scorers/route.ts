import { ScorersType } from "@/app/types/ScorersType";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest,{params}:{params:{id:string}}) => {
  const {id} = params;
  console.log('called')
  try{
    const res = await fetch(`https://api.football-data.org/v4/competitions/${id}/scorers?limit=30`,{
      headers:{
        'X-Auth-Token': process.env.API_KEY as string,
      },
      next:{
        revalidate:60 * 60 * 24,
      }
    })
    const data:ScorersType = await res.json()
    return NextResponse.json(data,{status:200})

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({status:err.message},{status:400})
    }
  }
}