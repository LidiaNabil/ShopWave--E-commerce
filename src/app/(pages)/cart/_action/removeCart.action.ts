'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function removeCartAction(cartId: string) {
     const token =await getUserToken()
    let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/` +cartId,
          {
        method: 'DELETE',
        headers: {
            token: token!,
        }
    }
    )
    let data=await res.json()
    return data

}