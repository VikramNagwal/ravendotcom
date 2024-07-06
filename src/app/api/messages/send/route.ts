import { NextResponse, NextRequest } from "next/server";
import { Message } from "@/Models/messageModel";
import { dbConnect } from '@/db/dbConfig'

dbConnect()

export async function POST(request: NextRequest){
    try {
      const reqBody = await request.json()
      const {subject, message} = reqBody

      const userMessage = await Message.create({
        subject,
        message
      })

      if(!userMessage) return NextResponse.json({ "error": "Message not sent" }, { status: 400 })

      return NextResponse.json({"message": 'message saved successfully', 'success': true, userMessage},{status: 201})
    } catch (error: any) {
        console.log("Signup failed: ", error)
        return NextResponse.json({ "error": error.message }, { status: 500 })       
    }
}