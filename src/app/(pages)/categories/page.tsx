import { CategoryI } from '@/interfaces'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Categories() {
    let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      let {data:categories}:{data:CategoryI[]} = await res.json()

    return (
      <>
        <div className="max-w-6xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold ">Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 ">
            {categories.map((category) => (
              <Link key={category._id} href={'/categories/'+ category._id}>
                <Card  className="shadow-md hover:shadow-lg transition rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-center">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className='h-100'>
                    <Image src={category.image} width={300} height={300} alt={category.name}  className="rounded-md  h-full" />
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </>
  )
}
