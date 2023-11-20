import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const response = await db.post.findMany({
              select:{
                id: true,
                title: true,
                content: true,
                tag: true,
              },
              orderBy: {
                createdAt: 'desc'
              }
            });
        return NextResponse.json(response, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'could not fetching post'}, {status: 500})
    }
    
}