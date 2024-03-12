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
        try{
            const tables = await prisma.table.findMany({
                where: {
                    ownerId: session.user.id
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
            return NextResponse.json(tables, {status: 200})
        }catch{
            return NextResponse.json({error: "An error occurred while fetching the tables"}, {status: 500})
        }
    }

    const tableExists = await prisma.table.findFirst({
        where: {
            ownerId: session.user.id,
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
                ownerId: session.user.id,
                idTable: parseInt(id),
            }
        })

        return NextResponse.json(table, {status: 201})
    } else {
        return NextResponse.json(tableExists, {status: 200})
    }
}

export async function DELETE(request: Request){

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
            ownerId: session.user.id,
            id: id
        }
    })

    if (!tableExists){
        return NextResponse.json({error: "Table not found"}, {status: 404})
    }

    try{
        await prisma.table.delete({
            where: {
                id: id
            }
        })
        return NextResponse.json({message: "Table deleted successfully"}, {status: 200})
    }catch{
        return NextResponse.json({error: "An error occurred while deleting the table"}, {status: 500})
    }

}