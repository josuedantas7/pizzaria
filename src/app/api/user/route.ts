
// bcrypt ( for password hashing )
import bcrypt from "bcrypt"

// db
import prisma from "@/lib/db"

// next server imports
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){

    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
        return NextResponse.json({error: 'All fields is required'})
    }

    const isUserExists = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if (isUserExists) {
        return NextResponse.json({error: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        })

        return NextResponse.json({user})
    }catch{
        return NextResponse.json({error: 'Error on create user'})
    }
}