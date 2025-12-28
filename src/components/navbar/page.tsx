"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { HeartIcon, Loader, ShoppingCartIcon, UserIcon } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { usePathname } from 'next/navigation'
import { CartContext } from '../Context/CartContext'
import { WishContext } from '../Context/WishlistContext'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
export default function Navbar() {
  let pathName = usePathname()
  let {userCart,loading:cartLoading}=useContext(CartContext)
  let { userWish, loading: wishLoading } = useContext(WishContext)
  const session=useSession()

  return (
    <>
      <div className='shadow-xl sticky top-0 z-50 bg-white/90 [font-family:Dancing-Script]'>
        <div className="container mx-auto  py-5 flex justify-between items-center">
          <div className='relative'>
            <h1 className='[font-family:Momo-Signature] '><Link href="/" >Shop<span className=' text-blue-500'>Wave</span></Link></h1>
          <p className='absolute start-1/8 lg:start-1/2 -bottom-5 text-sm min-w-50 text-gray-500'>The Wave of Shopping Starts Here</p>
          </div>
          {/* Desktop  */}
          <div className=' gap-3 hidden md:flex'>
              <NavigationMenu>
                <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products" className={pathName=='/products'? 'active':''}>Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands" className={pathName=='/brands'? 'active':''}>Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories"className={pathName=='/categories'? 'active':''}>Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
          </div>
          {/* Mobile  */}
          <div className="md:hidden">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button className="p-2 rounded-md border">
        <Menu />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent  className="w-50">
      <Link href="/products">
        <DropdownMenuItem>Products</DropdownMenuItem>
      </Link>
      <Link href="/brands">
        <DropdownMenuItem>Brands</DropdownMenuItem>
      </Link>
      <Link href="/categories">
        <DropdownMenuItem>Categories</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  </DropdownMenu>
          </div>


          <div className='flex gap-4 items-center '>
            {session.status == 'authenticated' &&
              <>
              <Link href="/cart">
              <div className='relative'>
              <ShoppingCartIcon />
                { userCart && userCart.numOfCartItems>0? <Badge className=" absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-blue-500">
                  {cartLoading ? <Loader className='animate-spin' /> :  userCart.numOfCartItems }
              </Badge>:''}
              </div>
              </Link>
              <Link href="/wishlist">
            <div className='relative'>
            <HeartIcon />
              {userWish && userWish.count>0 ? <Badge className=" absolute -top-2 -end-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums bg-blue-500">
                  {wishLoading ? <Loader className='animate-spin' /> :  userWish.count }
              </Badge>:''}
              </div>
            </Link>
              </>
            }
              <DropdownMenu>
                  <DropdownMenuTrigger><UserIcon /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                {session.status == 'authenticated' ?
                  <>
                    <Link href="/profile"><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                    <Link href="/addresses"><DropdownMenuItem>Addresses</DropdownMenuItem></Link>
                    <Link href="/allorders"><DropdownMenuItem>Orders</DropdownMenuItem></Link>
                    <DropdownMenuItem onClick={()=>signOut({callbackUrl:'/'}) } className='text-red-400  focus:text-red-400' >Logout</DropdownMenuItem>
                  </>
                  :
                  <>
                    <Link href="/login"><DropdownMenuItem>Login</DropdownMenuItem></Link>
                    <Link href="/register"><DropdownMenuItem>Register</DropdownMenuItem></Link>
                  </>
                  }
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}
