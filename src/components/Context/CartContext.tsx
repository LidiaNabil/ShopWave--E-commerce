'use client'
import { CartResponse } from '@/interfaces'
import React, { createContext, ReactNode, useEffect, useState } from 'react'


export const CartContext = createContext
    <{
    userCart: CartResponse | null,
    setUserCart: (value: CartResponse | null) => void,
    loading:boolean,
    setLoading: (value: boolean) => void,
    getUserCart: () => void,
    }>
    ({
    userCart:  null,
    setUserCart: () => { },
    loading:false,
    setLoading: () => { },
    getUserCart: () => { },
    })

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [userCart, setUserCart] = useState <CartResponse | null>(null)
    const [loading, setLoading] = useState(false)

    async function getUserCart() {
        setLoading(true)
        let res = await fetch('/api/get-cart')
        let data: CartResponse = await res.json()
        if (data.status == 'success') setUserCart(data)
        setLoading(false)
    }

    useEffect(() => {
        getUserCart()
    }, [])

  return (
      <CartContext.Provider value={{userCart,setUserCart,loading,setLoading,getUserCart}}>
          {children}
    </CartContext.Provider>
  )
}
