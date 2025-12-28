import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt'

export async function getUserToken() {
    const myCookies = await cookies()
    const x = myCookies.get('next-auth.session-token')?.value  ||   myCookies.get('__secure-next-auth.session-token')?.value
    const accessToken = await decode({ token: x, secret: process.env.AUTH_SECRET! })
    return accessToken?.token
}