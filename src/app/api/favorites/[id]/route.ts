import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export const DELETE = async (request:NextRequest,{params}:{params:{userId:string;teamId:string}}) => {
  try{
    await prisma.favoriteTeam.delete({
      where:{
        userId_teamId:{
          userId:params.userId,
          teamId:Number(params.teamId)
        },
      },
    })

    return NextResponse.json({success:true},{status:200})

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({error:err.message},{status:401})
    }
  }
}