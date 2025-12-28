'use client'
import { HeartIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { WishContext } from '../Context/WishlistContext'
import { addToWishlistAction } from '@/app/(pages)/products/_action/addToWishlist.action'

export default function AddToWhishlist({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const {getUserWish} = useContext(WishContext)
    async function AddWhish() {
        setIsLoading(true)
        let data = await addToWishlistAction(productId)
        setIsLoading(false)
        data.status == 'success' && toast.success('Product added to your wishlist')
        await getUserWish()
    }
  return (
      <>
          <HeartIcon onClick={AddWhish} className={`${isLoading?'animate-ping scale-130 ':''}  absolute end-5 top-5 z-10 text-red-600 scale-100 hover:scale-130 transition-all`} />
      </>
  )
}
