'use client'
import { WishResponse } from '@/interfaces'
import React, { createContext, ReactNode, useEffect, useState } from 'react'


export const WishContext = createContext
    <{
    userWish: WishResponse | null,
    setUserWish: (value: WishResponse | null) => void,
    loading:boolean,
    setLoading: (value: boolean) => void,
    getUserWish:()=>void
    }>
    ({
    userWish:  null,
    setUserWish: () => { },
    loading:false,
    setLoading: () => { },
    getUserWish:()=>{}
    })

export default function WishContextProvider({ children }: { children: ReactNode }) {
    const [userWish, setUserWish] = useState <WishResponse | null>(null)
    const [loading, setLoading] = useState(false)
    async function getUserWish() {
        setLoading(true)
        let res = await fetch('http://localhost:3000/api/get-wishlist')
        let data: WishResponse = await res.json()
        if (data.status == 'success') setUserWish(data)
        setLoading(false)
    }

    useEffect(() => {
        getUserWish()
    }, [])

  return (
      <WishContext.Provider value={{userWish,setUserWish,loading,setLoading,getUserWish}}>
          {children}
    </WishContext.Provider>
  )
}
