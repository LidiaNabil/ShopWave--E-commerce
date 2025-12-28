'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function removeWishlistAction(wishlistId: string) {
     const token =await getUserToken()
    let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist/` +wishlistId,
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