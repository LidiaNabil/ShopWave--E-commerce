import React from 'react'
import NotFound from '../../public/assets/not-found-page.png'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
            <>
              <div className='flex flex-col items-center justify-center gap-5 py-5'>
                <Image src={NotFound} alt="error 404" width={400} height={400} />
                <h1>Sorry ,the page was <span className='text-blue-900'> not found!</span></h1>
                <Link href="/"><Button className=' my-4 '>Return to Home</Button></Link>
              </div>
            </>
  )
}
