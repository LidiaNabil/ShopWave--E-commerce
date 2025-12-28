'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function checkoutCashAction(shippingAddress:{},cartId:string) {
     const token =await getUserToken()
       let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${cartId}`,
          {
            method: 'POST',
            body:JSON.stringify({shippingAddress}),
        headers: {
          token: token!,
          'content-type':'application/json'
        }
    }

    )
    let data=await res.json()
    return data

}