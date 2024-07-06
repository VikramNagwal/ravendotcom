import { dbConnect } from '@/db/dbConfig'
import { User } from '@/Models/userModel'
import { emailSender } from '@/utils/emailSender'
import {NextRequest, NextResponse} from 'next/server'

dbConnect()

interface userRequestBody {
     username: string,
     email: string,
     password: string
}

export async function POST(request: NextRequest) {
     try {
          const reqBody: userRequestBody = await request.json()
          const {username, email, password} = reqBody
          // for development purpose
          console.log(reqBody)

          const userExists = await User.findOne({
               $or: [{username}, {email}]
          })

          if(userExists) {
               return NextResponse.json({"error": "User already exists"}, {status: 400})
          }

          const newUser = new User({
               username,
               email,
               password
          })

          console.log(newUser)
          
          const savedUser = await newUser.save()
          console.log(savedUser)

          await emailSender(email, username)
          return NextResponse.json({"message": "user created successfully", "success": true, savedUser}, {status: 201})

     } catch (error: any) {
          console.log("Signup failed: ", error)
          return NextResponse.json({"error": error.message}, {status: 500})
     }


}