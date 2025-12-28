"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";

export default function Home() {
  const session=useSession()
  return (
    <>
    <section className="relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-3 py-20 text-center">
          {session.status == 'authenticated' &&
            <p className="text-3xl text-gray-600 font-medium mb-2">
          Hi {session.data.user.name}
        </p>}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Welcome to <span className="text-primary">ShopWave</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link href="/products">
            <Button size="lg">
              Shop Now
            </Button>
          </Link>
          <Link href="/categories">
            <Button size="lg" variant="outline">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>

    </>
  );
}
