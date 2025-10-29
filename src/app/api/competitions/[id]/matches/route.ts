import { MatchType } from "@/app/types/MatchType";
import { NextResponse } from "next/server";

export const GET = async (_request:Request,{params}:{params:{id:string}}) => {
  const {id} = params;
  try{
    const res = await fetch(`https://api.football-data.org/v4/competitions/${id}/matches?status=SCHEDULED`,{
      headers:{
        'X-Auth-Token': process.env.API_KEY as string,
      },
      next:{
        revalidate:60 * 60 * 24,
      }
    })
    const data:MatchType = await res.json();
    return NextResponse.json(data,{status:200})

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({status:err.message},{status:400})
    }
  }
}