
'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/Context/CartContext'
import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Loader, ShoppingBagIcon, Trash2Icon } from 'lucide-react'
import EmptyCart from '../../../../public/assets/empty-cart.png'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Clear from '@/components/ClearCart/page'
import Checkout from '@/components/Checkout/page'
import { updateCartAction } from './_action/updateCart.action'
import { removeCartAction } from './_action/removeCart.action'
import { clearCartAction } from './_action/clearCart.action'


export default function CartList() {
  let { userCart, setUserCart, loading,setLoading, getUserCart } = useContext(CartContext)
  const [UpdateLoadingId, setUpdateLoadingId] = useState <null|string> (null)
  const [RemoveLoadingId, setRemoveLoadingId] = useState <null|string> (null)
  const [ClearLoading, setClearLoading] = useState(false)

  useEffect(() => {
    if (typeof userCart?.data.products[0]?.product=='string') {
      getUserCart()
    }
  }, [])



  async function UpdateCart(cartId: string, count: number) {
    setUpdateLoadingId(cartId)
    let data = await updateCartAction(cartId,count)
    if (data.status == 'success') setUserCart(data)
    toast.success('product quantity updated ')
    setUpdateLoadingId(null)

  }
  async function RemoveCart(cartId: string) {
    setRemoveLoadingId(cartId)
    let data = await removeCartAction(cartId)
    if (data.status == 'success') setUserCart(data)
    toast.success('product removed from your cart')
    setRemoveLoadingId(null)
  }
  async function ClearCart() {
    setClearLoading(true)
    let data = await clearCartAction()
    if (data.message == 'success') setUserCart(null)
    toast.success('cart cleared')
    setClearLoading(false)
  }


  return (
    <>
      {loading || typeof userCart?.data.products[0]?.product=='string'? <Loading /> :
      <div>
          <h1>Shopping Cart</h1>
          {userCart && userCart.numOfCartItems>0 ?
            <>
              <p className='text-gray-500 my-2'>{userCart.numOfCartItems} items in your cart</p>
          <div className=' grid grid-cols-3 gap-5 mt-7'>
            <div  className='col-start-1 col-end-4 lg:col-end-3 flex flex-col gap-3 '>
            {userCart.data.products.map((cartItem) =>
              <Card  key={cartItem._id} className=' hover:shadow-blue-300 flex flex-row gap-2 items-center p-2 '>
                <Image src={cartItem.product.imageCover} alt={cartItem.product.title} className='ms-5  w-30   rounded-2xl' width={300} height={300} />
                <div className=' w-full flex flex-col  sm:gap-4  '>
                <div className='sm:flex '>
                <CardHeader className='grow '>
                  <CardTitle className='text-lg' >{cartItem.product.title}</CardTitle>
                      <div className='flex gap-x-2  '>
                        <CardDescription>{cartItem.product.category.name}</CardDescription>
                        <CardDescription> / </CardDescription>
                        <CardDescription>{cartItem.product.brand.name}</CardDescription>
                      </div>
                </CardHeader>
              <CardContent className=' text-end pt-2'>
                    <h2 className='text-md font-semibold'> EGP { cartItem.price} </h2>
                    <p> each</p>
              </CardContent>
              </div>
                <CardFooter className='flex flex-row gap-x-3  ps-5'>
                        <Button disabled={cartItem.count==1} onClick={()=>UpdateCart(cartItem.product._id,cartItem.count-1)} className='p-0 size-9 bg-transparent hover:bg-gray-100 text-black font-serif border shadow  '>-</Button>
                        {UpdateLoadingId == cartItem.product._id ? <Loader className='animate-spin w-3' /> : <span>{ cartItem.count}</span>}
                        <Button disabled={cartItem.count == cartItem.product.quantity} onClick={()=>UpdateCart(cartItem.product._id,cartItem.count+1)} className='p-0 size-9 bg-transparent hover:bg-gray-100 text-black font-serif border shadow  '>+</Button>

                <Button onClick={() => RemoveCart(cartItem.product._id)} className='bg-transparent hover:bg-transparent text-red-700 ms-auto '>{RemoveLoadingId==cartItem.product._id?<Loader className='animate-spin'/>:<Trash2Icon/> }</Button>
              </CardFooter>
              </div>
            </Card>
                  )}
                </div>
                 {/* Order Summary */}
            <div className='lg:sticky top-28 self-start lg:row-start-1  lg:col-start-3 col-start-1  col-end-4 flex flex-col gap-y-2'>
                <Card id="summary-checkout" className='shadow-2xl sm:px-10 md:px-15 lg:px-0'>
              <CardHeader>
                  <CardTitle className='text-xl font-bold'>Order Summary</CardTitle>
                  <div className='flex justify-between mt-5 text-gray-500 '>
                    <p>Subtotal  ({ userCart.numOfCartItems} items)</p>
                    <p className='text-black font-semibold'>EGP { userCart.data.totalCartPrice}</p>
                  </div>
                  <div className='flex justify-between text-gray-500 '>
                    <p>Shipping</p>
                    <p className='text-green-600'>Free</p>
                </div>
              </CardHeader>
              <CardContent className='flex flex-row justify-between border-t py-3 font-bold'>
                <p>Total</p>
                <p>EGP { userCart.data.totalCartPrice}</p>
              </CardContent>
              <CardFooter className='flex flex-col gap-3'>
                <div className='w-full'>
                        <Checkout cartId={userCart.cartId } />
                </div>
                <Link href="/products" className='w-full'><Button className=' w-full bg-transparent border-2 border-blue-300 hover:text-white text-black '>Continue Shopping</Button></Link>
              </CardFooter>
            </Card>
                  <div className='absolute top-28 end-5 lg:static text-end flex flex-col '>
                    <Clear clearFn={ClearCart} loading={ClearLoading}  />
                    <Link href="#summary-checkout" ><Button variant='link' className='lg:hidden pe-0  text-blue-900 font-bold '>Order Summary & Checkout</Button> </Link>
            </div>
                  </div>
              </div>
            </>
            :
            <>
              <div className='flex flex-col items-center justify-center gap-5 py-5'>
                <Image src={EmptyCart} alt="shopping cart" width={400} height={400} />
                <h1>Your Cart is <span className='text-blue-900'>Empty!</span></h1>
                <Link href="/products"><Button className=' my-4 '><ShoppingBagIcon/>Shop Now</Button></Link>
              </div>
            </>
          }
      </div>}
    </>
  )
}
