import { PersonsType } from "@/app/types/PersonsType";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest,{params}:{params:{id:string}}) => {
  const {id} = params;

  const res = await fetch(`https://api.football-data.org/v4/persons/${id}`,{
    headers:{
      'X-Auth-Token' : process.env.API_KEY as string
    }
  })
  const data:PersonsType = await res.json();
  return NextResponse.json(data,{status:200})

}