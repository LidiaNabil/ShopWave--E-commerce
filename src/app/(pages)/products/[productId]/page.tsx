import { Params } from 'next/dist/server/request/params';
import React from 'react'
import Link from 'next/link'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductI  } from "@/interfaces";
import {   ArrowRightIcon, HeartIcon,  SlashIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/ratingStars/page';
import ProductCarousel from '@/components/productCarousel/page';
import AddToCart from '@/components/AddToCartlist/page';
import AddToWhishlist from '@/components/AddToWishlist/page';


export default async function  ProductDetails({ params }:{params:Params }) {
    let { productId } = await params
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/` + productId)
    let { data:productItem }:{data:ProductI} = await res.json()

  return (
      <>
            <Card className=' w-full lg:w-3/4 xl:w-3/5  p-5  mx-auto  mt-10  relative grid grid-cols-5 overflow-hidden  shadow-md rounded-4xl border-0' >
              <AddToWhishlist productId={productItem._id }/>
              <div className='col-start-1 col-end-6 sm:col-end-3 my-auto'>
                  <ProductCarousel images={productItem.images } alt={productItem._id} />
              </div>
                <div className='flex flex-col gap-y-3 col-start-1 sm:col-start-3 col-end-6'>
                    <CardHeader>
                        <Badge>{ productItem.brand.name}</Badge>
                        <CardTitle className='text-xl font-bold'>{ productItem.title} </CardTitle>
                        <CardDescription className='text-md text-gray-700 my-2'>{ productItem.description}</CardDescription>
                        <CardDescription className='text-md '>{ productItem.category.name}</CardDescription>
                    </CardHeader>
                  <CardContent>
                      <div className='flex gap-1  items-center'>
                      <Rating rating={productItem.ratingsAverage} />
                      <p className='text-gray-500 text-sm ms-2'> { productItem.ratingsQuantity} Reviews</p>
                      </div>
                      <div className='flex flex-wrap gap-2 my-4 items-baseline'>
                        <Badge className='bg-green-600'>{ productItem.quantity} in stock</Badge>
                        {productItem.sold == null ? null : <Badge className='bg-red-600'>{(productItem.sold).toString().length > 6 ? (productItem.sold).toString().slice(0,6)+'...' : productItem.sold} Sold</Badge>}
                        <Link href={'/categories/'+productItem.category._id}><Badge className='bg-gray-400'>{ productItem.category.name} <ArrowRightIcon /></Badge></Link>
                        <Link href={'/brands/'+productItem.brand._id}><Badge className='bg-gray-400'>{ productItem.brand.name} <ArrowRightIcon /></Badge></Link>
                    </div>
                    {productItem.priceAfterDiscount ?
                      <div className='flex gap-4 items-center'>
                        <div className='relative'>
                          <p className='text-gray-500 '>{productItem.price}</p>
                          <SlashIcon className='absolute start-0 top-0  text-gray-500 ' />
                        </div>
                        <p className='font-bold text-2xl text-red-700'> EGP {productItem.priceAfterDiscount}</p>
                      </div> :
                      <p className='font-bold text-2xl text-red-700'> EGP {productItem.price}</p>
                    }
                    </CardContent>
                    <CardFooter>
                      <AddToCart productId={productItem._id }/>
                    </CardFooter>
                </div>
            </Card>
      </>
  )
}
