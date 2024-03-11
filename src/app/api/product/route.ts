import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user){
        return NextResponse.json({error: "You must be logged in to create a product"}, {status: 401})
    }

    const { name,price,description,categoryId } = await request.json()

    if (!name || !price || !description || !categoryId){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                ownerId: session.user.id,
                price,
                description,
                categoryId,
            }
        })
        return NextResponse.json(product, {status: 201})
    }catch{
        return NextResponse.json({error: "An error occurred while creating the product"}, {status: 500})
    }
}

export async function GET(request: Request){

    const session = await getServerSession(authOptions)
    
    if (!session || !session.user){
        return NextResponse.json({error: "You must be logged in to view products"}, {status: 401})
    }

    const { searchParams } = new URL(request.url)

    const idCategory = searchParams.get('idCategory')

    if (!idCategory){
        return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: idCategory,
                ownerId: session.user.id
            }
        })
        return NextResponse.json(products, {status: 200})
    }catch{
        return NextResponse.json({error: "An error occurred while fetching the products"}, {status: 500})
    }
}