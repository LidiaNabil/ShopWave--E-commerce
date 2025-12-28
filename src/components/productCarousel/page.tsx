'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
export default function ProductCarousel({images,alt}:{images:string[],alt:string}) {
  return (
      <>
          <Carousel  opts={{
                          align: "start",
                          loop: true,
                  }}
                    plugins={[
                      Autoplay({
                        delay: 2000,
                      }),
                    ]}
                  >
                    <CarouselContent>
                  {images.map((image,index) => <CarouselItem key={index}>
                      <Image src={image} alt={alt} className=' w-full ' width={300} height={300} />
                    </CarouselItem>)
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    </Carousel>
      </>
  )
}
