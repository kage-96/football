import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request:NextRequest) => {
  try{
    const users = await prisma.user.findMany({
      orderBy:{createdAt:"desc"},
      select:{
        id:true,
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
    console.error("Prisma error:",err)
    console.log(err);
    return NextResponse.json({status:"error",message:"Failed to fetch users"},{status:500})

  }
}