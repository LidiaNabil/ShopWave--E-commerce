'use client'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { CartContext } from '../Context/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'

export default function AddToCart({ productId }: { productId: string }) {

    const session = useSession()
    const router=useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { setUserCart, setLoading } = useContext(CartContext)

    async function AddCart() {
         if (session.status == 'authenticated') {
            setIsLoading(true)
             setLoading(true)
             const data=await addToCartAction(productId)
                data.status == 'success' && toast.success('Product added to your cartlist')
                    setUserCart(data)
                    setIsLoading(false)
                    setLoading(false)
         } else {
                router.push('/login')
        }
    }

  return (
      <>
          <Button onClick={AddCart} className='w-full'>{isLoading?<Loader className='animate-spin'/>:<ShoppingCartIcon/> }Add to cart</Button>
      </>
  )
}
