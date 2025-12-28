import React from 'react'
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
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, HeartIcon, SlashIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Rating from '@/components/ratingStars/page';
import AddToCart from '@/components/AddToCartlist/page';
import AddToWhishlist from '@/components/AddToWishlist/page';
import Link from 'next/link';

export default function CardItem({ data}:{data:any }) {
  return (
      <>
      <Card className='group hover:shadow-blue-300 relative gap-3 shadow-md rounded-4xl border-0' key={data._id}>
            <AddToWhishlist productId={data._id }/>
              <div className='overflow-hidden  w-3/5 mx-auto'>
                <Image src={data.imageCover} alt={data.title} className=' group-hover:scale-120 transition-all w-full ' width={300} height={300} />
              </div>
              <Link href={'/products/'+ data._id} >
                <Button className='group-hover:opacity-100 group-hover:end-5 hover:bg-gray-500 transition-all opacity-0 absolute end-0 top-1/2  bg-gray-400 rounded-3xl text-md '>
                    <span>More info..</span>
                    <ArrowRightIcon />
                </Button>
              </Link>
              <CardHeader>
                  <Badge>{ data.brand.name}</Badge>
                  <CardTitle className='text-xl font-bold'>{ data.title.split(' ',2).join(' ')} ...</CardTitle>
                  <CardDescription className='text-md '>{ data.category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex gap-1 my-2 items-center'>
                  <Rating rating={data.ratingsAverage} />
                  <p className='text-gray-500 text-sm ms-2'> { data.ratingsQuantity} Reviews</p>
                  </div>
                {data.priceAfterDiscount ?
                  <div className='flex gap-4 items-center'>
                    <div className='relative'>
                      <p className='text-gray-500 '>{data.price}</p>
                      <SlashIcon className='absolute start-0 top-0  text-gray-500 ' />
                    </div>
                    <p className='font-bold text-2xl text-red-700'> EGP {data.priceAfterDiscount}</p>
                  </div> :
                  <p className='font-bold text-2xl text-red-700'> EGP {data.price}</p>
                }
                </CardContent>
            <CardFooter>
                <AddToCart productId={data._id } />
            </CardFooter>
          </Card>
      </>
  )
}
