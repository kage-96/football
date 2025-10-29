import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (request:NextRequest,{params}:{params:{id:string}}) => {

  try{

    const user = await prisma.user.findUnique({
      where:{ id: params.id },
      include:{
        favorites:{
          include:{
            team:{
              select:{ id:true, shortName:true, crestUrl:true }
            }
          }
        }
      }
    });
    
    if(!user) return NextResponse.json({error:"User not found"},{status:404})
      
    console.log(user)
    return NextResponse.json(user,{status:200});

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({error:`Server Error: ${err.message}`},{status:500})
    }
  }
}