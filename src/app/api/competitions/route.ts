import { CompetitionsResponseType } from "@/app/types/CompetitionsType";
import { NextResponse } from "next/server";

const leagueList = ['Premier League','Ligue 1','Bundesliga','Serie A','Primera Division']
interface Data {
  name:string
}

export const GET = async () => {

  try{

    const res = await fetch('https://api.football-data.org/v4/competitions',{
      headers:{
        'X-Auth-Token': process.env.API_KEY as string,
      },
      next:{
        revalidate:60 * 60 * 24 * 30,
      }
    })
    const data:CompetitionsResponseType = await res.json();
    const filteredData = data.competitions.filter((d:Data) => leagueList.includes(d.name))

    return NextResponse.json(filteredData,{status:200})
  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({status:err.message},{status:400})
    }
  }
}