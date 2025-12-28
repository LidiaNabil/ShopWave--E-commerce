"use client"

import React, { useContext, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { CartContext } from "../Context/CartContext"
import Loading from "@/app/loading"
import { checkoutSessionAction } from "@/app/(pages)/cart/_action/checkoutSession.action"
import { checkoutCashAction } from "@/app/(pages)/cart/_action/checkoutCash.action"

export default function Checkout({ cartId }: { cartId: string }) {
  const cityInput = useRef<HTMLInputElement>(null)
  const detailsInput = useRef<HTMLInputElement>(null)
  const phoneInput = useRef<HTMLInputElement>(null)

  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const { setUserCart } = useContext(CartContext)
  const router = useRouter()


  function checkInputs() {
    const city = cityInput.current?.value
    const details = detailsInput.current?.value
    const phone = phoneInput.current?.value
    if (!city || !details || !phone) {
      toast.error("Please enter your address info first")
      return false
    }
    return true
  }

  function getAddress() {
    return {
      city: cityInput.current!.value,
      details: detailsInput.current!.value,
      phone: phoneInput.current!.value,
    }
  }

  async function checkoutCash() {
    if (!checkInputs()) return
    setCheckoutLoading(true)
    const data = await checkoutCashAction(getAddress(), cartId)
    if (data.status === "success") {
      setUserCart(null)
      router.push("/allorders")
    }
    setCheckoutLoading(false)
  }

  async function checkoutSession() {
    if (!checkInputs()) return
    setCheckoutLoading(true)
    const data = await checkoutSessionAction(getAddress(), cartId)
    if (data.status === "success") {
      window.location.href = data.session.url
    }
    setCheckoutLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Proceed to Checkout</Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] ${checkoutLoading ? "opacity-60" : ""}`}>
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
          <DialogDescription>
            Add a shipping address for your deliveries.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>City</Label>
            <Input ref={cityInput} className="w-full"/>
          </div>
          <div className="grid gap-2">
            <Label>Details</Label>
            <Input ref={detailsInput} className="w-full" />
          </div>
          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input ref={phoneInput} className="w-full"/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Checkout</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Checkout Methods</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={checkoutCash}>Cash</DropdownMenuItem>
              <DropdownMenuItem onClick={checkoutSession}> Visa </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogFooter>
        {checkoutLoading &&
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}
