import React from 'react'
import Link from 'next/link'
import { ProductI  } from "@/interfaces";
import CardItem from '@/components/Card/page';



export default async function Products() {
let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  let {data:products}:{data:ProductI[]} = await res.json()


  return (
    <>
      <div className=' gap-10 xl:gap-8 grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((product)=>
            <CardItem key={product._id} data={product} />
          )}
        </div>
    </>
  )
}
