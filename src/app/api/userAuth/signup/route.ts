import { dbConnect } from '@/db/dbConfig'
import { User } from '@/Models/userModel'
import {NextRequest, NextResponse} from 'next/server'

interface userRequestBody {
     username: string,
     email: string,
     password: string
}

dbConnect()

export async function POST(request: NextRequest) {
     try {
          const reqBody: userRequestBody = await request.json()
          const {username, email, password} = reqBody

          console.log(reqBody)
     
          const newUser = new User({
               username,
               email,
               password
          })

          const savedUser = await newUser.save()

          return NextResponse.json(savedUser, {status: 201})

     } catch (error) {
          console.log("Signup failed: ", error)
          return NextResponse.json({"error": "Signup failed, please try again later"}, {status: 500})
     }


}