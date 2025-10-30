import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try{
    const users = await prisma.user.findMany({
      orderBy:{createdAt:"desc"},
      select:{
        id:true,
        email:true,
        createdAt:true,
        favorites:{
          select:{
            team:{
              select:{
                id:true,
                shortName:true,
                crestUrl:true
              }
            },
          },
        },
      },
    })
    return NextResponse.json({status:"OK",users},{status:200})

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({detail:err.message},{status:500})
    }
  }
}