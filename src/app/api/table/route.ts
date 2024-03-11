import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')

    if (!id){
        return NextResponse.json({error: "id is required"}, {status: 400})
    }

    const tableExists = await prisma.table.findFirst({
        where: {
            idTable: parseInt(id)
        },
        include: {
            Order: {
                include: {
                    OrderProduct: {
                        include: {
                            Product: true
                        }
                    }
                }
            }
        }
    })

    if (!tableExists){
        const table = await prisma.table.create({
            data: {
                idTable: parseInt(id),
            }
        })

        return NextResponse.json(table, {status: 201})
    } else {
        return NextResponse.json(tableExists, {status: 200})
    }
}