import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

interface Body {
  id:number
  shortName:string
  crestUrl?:string
}

export const POST = async (request:NextRequest) => {
  
  try{
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data:{user},
      error,
    } = await supabase.auth.getUser();

    if(error || !user){
      return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const body = await request.json()
    const {id,shortName,crestUrl}:Body = body;

    const data = await prisma.team.upsert({
      where:{id},
      update:{},
      create:{
        id,
        shortName,
        crestUrl,
      }
    })
    return NextResponse.json(
      {
      status:"OK",
      message:data ? "チームは既にデータベースに登録されています。" : "新規登録しました。",
      id:data.id
    },
    {status:200}
  )

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({status:err.message},{status:400})
    }
  }
}