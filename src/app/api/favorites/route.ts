import { PrismaClient } from "@prisma/client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export const POST = async (request:NextRequest) => {
  try{
    const supabase = createRouteHandlerClient({cookies});
    const {
      data:{user},
    } = await supabase.auth.getUser();

    if(!user){
      return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    
    const {teamId} = await request.json();
    if(!teamId){
      return NextResponse.json({error:"teamId is required"},{status:400})
    }

    const favorite = await prisma.favoriteTeam.upsert({
      where:{
        userId_teamId:{
          userId:user.id,
          teamId:teamId,
        },
      },
      update:{},
      create:{
        userId:user.id,
        teamId:teamId
      },
    });

    return NextResponse.json(
      {message:"お気に入り登録しました。",favorite},
      {status:200}
    );

  }catch(err){
    if(err instanceof Error){
      return NextResponse.json({error:err.message},{status:500})
    }
  }

}

export const GET = async () => {

  try{
    const supabase = createRouteHandlerClient({cookies})
    const {
      data:{user},
    } = await supabase.auth.getUser();

    if(!user){
      return NextResponse.json({error:"Unauthorized"},{status:404})
    }

    const favorites = await prisma.favoriteTeam.findMany({
      where:{userId:user.id},
      include:{team:true},
      orderBy:{createdAt:"desc"}
    });

    return NextResponse.json({favorites},{status:200})

  }catch(error){
    if(error instanceof Error){
      return NextResponse.json({error:error.message},{status:401})
    }

  }

}