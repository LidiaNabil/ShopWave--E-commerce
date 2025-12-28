import React from 'react'
import { Params } from 'next/dist/server/request/params';
import {  ProductI } from '@/interfaces';
import CardItem from '@/components/Card/page';

export default async function BrandDetails({ params }:{params:Params }) {
let { brandId } = await params
let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands/${brandId}`)
  let { data } = await res.json()
  let brandItems = await getBrandProducts(data._id)

  async function getBrandProducts(brandId:string) {
    let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?brand=${brandId}`)
      let { data }: { data: ProductI[] } = await res.json()
      return data
  }


  return (
    <>
      <div className='pb-5'>
        <h1 className="text-3xl font-bold pb-3">{brandItems[0]?.brand.name}</h1>
        <p className='text-gray-500'>{brandItems.length } products from this brand</p>
      </div>
      {brandItems.length!= 0 ?
          <div className=' gap-10 xl:gap-8 grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4'>
              {brandItems.map((items)=>
                <CardItem key={items._id} data={items} />
              )}
        </div>
        :
          <div className='flex justify-center items-center min-h-[50vh]'>
          <h1 className='text-center'>Oops! <br />No products of this brand :(</h1>
        </div>}
        </>
      )
}
