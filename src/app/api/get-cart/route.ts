import { getUserToken } from "@/app/Helpers/getuserToken"
import { CartResponse } from "@/interfaces"
import { NextResponse } from "next/server"

export async function GET() {
    const token =await getUserToken()
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`,
                {
                    headers: {
                        token:token!
                    }
               }
           )
    let data: CartResponse = await res.json()
    return NextResponse.json(data)

}