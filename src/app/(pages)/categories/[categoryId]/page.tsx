import React from 'react'
import { Params } from 'next/dist/server/request/params';
import {  ProductI } from '@/interfaces';
import CardItem from '@/components/Card/page';

export default async function CategoryDetails({ params }:{params:Params }) {
let { categoryId } = await params
let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`)
  let { data } = await res.json()
  let categoryItems = await getCategoryProducts(data._id)

  async function getCategoryProducts(categoryId :string) {
    let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category[in]=${categoryId }`)
    let { data }: { data: ProductI[] } = await res.json()
      return data
  }


  return (
    <>
      <div className='pb-5'>
        <h1 className="text-3xl font-bold pb-3">{categoryItems[0]?.category.name}</h1>
        <p className='text-gray-500'>{categoryItems.length } products from this category</p>
      </div>
      {categoryItems.length!=0 ?
        <div className=' gap-10 xl:gap-8 grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4'>
              {categoryItems.map((items)=>
                <CardItem key={items._id} data={items} />
              )}
        </div>
        :
        <div className='flex justify-center items-center min-h-[50vh]'>
          <h1 className='text-center'>Oops! <br />No products of this category :(</h1>
        </div>
            }
        </>
  )
}
