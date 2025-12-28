'use client'
import React, { useContext, useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {  ArrowBigRightDashIcon, Loader, ShoppingBagIcon, Trash2Icon } from 'lucide-react'
import { WishContext } from '@/components/Context/WishlistContext'
import Loading from '@/app/loading'
import EmptyWish from '../../../../public/assets/empty-wishlist.png'
import toast from 'react-hot-toast'
import Link from 'next/link'
import AddToCart from '@/components/AddToCartlist/page'
import { removeWishlistAction } from './_action/removeWishlist.action'

export default function Wishlist() {
  let { userWish, loading,setUserWish ,getUserWish ,setLoading } = useContext(WishContext)
  const [RemoveLoadingId, setRemoveLoadingId] = useState <null|string> (null)


  async function RemoveWishlist(wishlistId: string) {
    setRemoveLoadingId(wishlistId)
    let data = await removeWishlistAction(wishlistId)
    if (data.status == 'success') await getUserWish()
    toast.success('product removed from your wishlist')
    setRemoveLoadingId(null)
  }


  return (
    <>
          {loading ? <Loading /> :
          <div>
          <h1>Shopping Wishlist</h1>
              {userWish && userWish.count>0  ?
                <><p className='text-gray-500 my-2'>{userWish?.count} items in your Wish</p>
                <div  className='mt-7 mx-auto xl:w-5/6 flex flex-col gap-3 '>
                {userWish?.data.map((WishItem) =>
                  <Card  key={WishItem._id} className=' hover:shadow-blue-300 flex flex-row gap-2 items-center p-2 overflow-hidden'>
                    <Image src={WishItem.imageCover} alt={WishItem.title} className='ms-5  w-30   rounded-2xl' width={300} height={300} />
                    <div className=' w-full sm:flex items-center'>
                    <CardHeader className='grow '>
                      <CardTitle className='text-lg' >{WishItem.title}</CardTitle>
                          <div className='flex gap-x-2  '>
                            <CardDescription>{WishItem.category.name}</CardDescription>
                            <CardDescription> / </CardDescription>
                            <CardDescription>{WishItem.brand.name}</CardDescription>
                          </div>
                          <h2 className='pt-2 text-lg font-semibold'> EGP { WishItem.price} </h2>
                    </CardHeader>
                  <CardContent className=' flex  pt-2'>
                        <div>
                           <AddToCart productId={WishItem._id } />
                          </div>
                          <Button onClick={() => RemoveWishlist(WishItem._id)} className='bg-transparent hover:bg-transparent text-red-700 ms-auto '>{RemoveLoadingId==WishItem._id?<Loader className='animate-spin'/>:<Trash2Icon/> }</Button>
                  </CardContent>
                  </div>
                </Card>
                      )}
                </div>
                    <div className='absolute top-35 end-5  text-end'>
                        <Link href="/products"  className='w-full'><Button className=' w-full bg-transparent border-2 border-blue-300 hover:text-white text-black ' >Continue Shopping <ArrowBigRightDashIcon/> </Button></Link>
                    </div>
                  </>
                :
                <>
                  <div className='flex flex-col items-center justify-center gap-5 py-5'>
                    <Image src={EmptyWish} alt="shopping Wishlist" width={400} height={400} />
                    <h1>Your Wishlist is <span className='text-blue-900'>Empty!</span></h1>
                    <Link href="/products"><Button className=' my-4 '><ShoppingBagIcon/>Shop Now</Button></Link>
                  </div>
                </>
              }
          </div>}
        </>
  )
}
