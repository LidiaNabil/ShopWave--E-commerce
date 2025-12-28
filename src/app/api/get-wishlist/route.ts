import { getUserToken } from "@/app/Helpers/getuserToken"
import {  WishResponse } from "@/interfaces"
import { NextResponse } from "next/server"

export async function GET() {
    const token =await getUserToken()
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
            {
                headers: {
                    token: token!
                }
           }
       )
    let data: WishResponse = await res.json()
    return NextResponse.json(data)

}