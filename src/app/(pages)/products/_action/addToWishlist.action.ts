'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function addToWishlistAction(productId: string) {
     const token =await getUserToken()
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`,
            {
                method: 'POST',
                body: JSON.stringify({ productId }),
                headers: {
                    token: token!,
                'content-type':'application/json'
                }
            }
        )
        let data=await res.json()
    return data

}