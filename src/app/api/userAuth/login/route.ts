import { dbConnect } from "@/db/dbConfig";
import { User } from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";

interface userRequestBody {
     username: string,
     email: string,
     password: string
}

dbConnect()

export async function POST(request: NextRequest) {
try {
    const reqBody:userRequestBody = await request.json()
    if(!reqBody) return NextResponse.json({"error": "login: didn't recieved data"}, {status: 400})

        // for development purpose
        console.log(reqBody)

        const {email, password} = reqBody;

        const user = await User.findOne({email})
        if(!user) return NextResponse.json({"error": "login: user not found"}, {status: 404})

        const isAuthentic = await user.comparePassword(password)
        if(!isAuthentic) return NextResponse.json({"error": "login: password is incorrect"}, {status: 401})

        return NextResponse.json(user, {status: 200})

} catch (error) {
    return NextResponse.json({"error": `login failed can't login user at this moment. please try later:  ${error}`}, {status: 500})
}
}