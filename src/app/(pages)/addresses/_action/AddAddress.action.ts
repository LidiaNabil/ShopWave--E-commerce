'use server'
import { getUserToken } from "@/app/Helpers/getuserToken"

export async function addAddressAction(form:  {
  name: string
  city: string
  details: string
  phone: string
}) {
     const token =await getUserToken()
            let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresses`,
                {
                    method: 'POST',
                    body:JSON.stringify(form),
                    headers: {
                        token: token!,
                        'content-type':'application/json'
                    }
                }
                )
                let data=await res.json()
    return data

}