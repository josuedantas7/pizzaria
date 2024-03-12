import { authOptions } from "@/lib/auth"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(request: Request){
    const { idTable, idProduct, quantity, tableId } = await request.json()
    if (!idTable || !idProduct || !quantity){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }
    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "You must be logged in to create an order"}, {status: 401})
    }

    try {
        const OrderProduct = await prisma.orderProduct.create({
            data: {
                quantity: quantity as number,
                productId: idProduct as string,
            }
        })

        const orderExists = await prisma.order.findFirst({
            where: {
                ownerId: session.user.id,
                tableId: tableId,
            }
        })

        if (orderExists) {
            const order = await prisma.order.update({
                where: {
                    ownerId: session.user.id,
                    id: orderExists.id
                },
                data: {
                    OrderProduct: {
                        connect: {
                            id: OrderProduct.id
                        }
                    }
                }
            })
            return NextResponse.json(order, {status: 201})
        } else {
            const order = await prisma.order.create({
                data: {
                    ownerId: session.user.id,
                    tableId: tableId,
                    OrderProduct: {
                        connect: {
                            id: OrderProduct.id
                        }
                    }
                }
            })
            return NextResponse.json(order, {status: 201})
        }
    }catch{
        return NextResponse.json({error: "An error occurred while creating the order"}, {status: 500})
    }
}