import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const  POST = async (request:NextRequest) => {
  const body = await request.json();
  const {id,email} = body;

  if(!id || !email){
    return NextResponse.json(
      {error:"Missing id or email"},
      {status:400}
    )
  }

  const exists = await prisma.user.findUnique({where:{id}})
  if(exists){
    return NextResponse.json(
      {status:"already exists"},
      {status:200}
    )
  }

  const newUser = await prisma.user.create({
    data:{id,email}
  })
  return NextResponse.json(newUser,{status:201})

}
