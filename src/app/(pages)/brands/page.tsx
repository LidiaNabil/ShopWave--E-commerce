import { BrandI } from '@/interfaces'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'



export default async function Brands() {
  let res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brands`)
    let {data:brands}:{data:BrandI[]} = await res.json()

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold ">Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 ">
          {brands.map((brand) => (
            <Link key={brand._id} href={'/brands/'+ brand._id}>
              <Card  className="shadow-md hover:shadow-lg transition rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-center">{brand.name}</CardTitle>
              </CardHeader>
                <CardContent>
                  <Image src={brand.image} width={300} height={300} alt={brand.name}  className="rounded-md" />
                </CardContent>
                </Card>
              </Link>
          ))}
        </div>
      </div>
    </>
  )
}
