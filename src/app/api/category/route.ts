import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "You must be logged in to create a category"}, {status: 401})
    }

    const { name } = await request.json()

    if (!name){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    try {
        const category = await prisma.category.create({
            data: {
                name,
                ownerId: session.user.id,
            }
        })
        return NextResponse.json(category, {status: 201})
    }catch{
        return NextResponse.json({error: "An error occurred while creating the category"}, {status: 500})
    }
}