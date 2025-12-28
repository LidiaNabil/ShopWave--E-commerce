'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function checkoutSessionAction(shippingAddress:{},cartId:string) {
     const token =await getUserToken()
       let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,
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