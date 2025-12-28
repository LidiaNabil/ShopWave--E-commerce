"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderI } from '@/interfaces'
import { useEffect, useState } from "react"
import { verifyTokenOrderAction } from "./_action/verifyTokenOrder.action"
import Image from "next/image"
import Loading from '@/app/loading'

export default function AllUserOrders() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<OrderI[]>([])

    async function verifyTokenOrder() {
      let data = await verifyTokenOrderAction()
    if (data.message == 'verified') await getUserOrders(data.decoded.id)
    setLoading(false)
  }
    async function getUserOrders(userId:string) {
    let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/user/`+userId)
      let data: OrderI[]  = await res.json()
      setOrders(data.reverse())
  }

  useEffect(() => {
      verifyTokenOrder()
  }, [])


  return (
    <>{ loading?<Loading />:
      !orders ?
        <div className='flex justify-center items-center min-h-[50vh]'>
          <h1 className='text-center'>No orders added yet :(</h1>
        </div>
        :
        <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">All Orders</h1>
      {orders.map((order) => (
        <Card
          key={order._id}
          className="shadow-md hover:shadow-lg transition rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">
              Order #{order.id}
            </CardTitle>
            <span className="text-lg font-bold text-primary">
              {order.totalOrderPrice} EGP
            </span>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className=" flex justify-between">
            <div className=" space-y-3 ">
              <p>
                <span className="font-semibold">Order Date: </span>
                  {new Date(order.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
              </p>
              <p>
                <span className="font-semibold">Payment: </span>
                {order.paymentMethodType}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {order.user.phone}
              </p>
              </div>
              <div className="min-w-35 space-y-3 ">
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md">
                    <span className="font-medium text-gray-700">Shipping:</span>
                    <span className={`font-semibold ${order.shippingPrice === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {order.shippingPrice > 0 ? `${order.shippingPrice} EGP` : "Free"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md">
                    <span className="font-medium text-gray-700">Tax:</span>
                    <span className={`font-semibold ${order.taxPrice === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {order.taxPrice > 0 ? `${order.taxPrice} EGP` : "Free"}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-3 ">
              {order.isPaid ?
                <Badge className="bg-green-100 text-green-700">
                Paid
                </Badge>
                :
                <Badge className="bg-red-100 text-red-700">
                Not Paid
              </Badge>}
              {order.isDelivered?
                <Badge className="bg-blue-100 text-blue-700">
                  Delivered
                </Badge>
                :
                <Badge className="bg-yellow-100 text-yellow-800">
                  Pending
                </Badge>
              }
                  </div>
                </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  View Order Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl  max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>
                    Order #{order.id} Items
                  </DialogTitle>
                </DialogHeader>
                {/* Scroll Area */}
                <ScrollArea className="max-h-[35vh] pr-4">
                  <div className="space-y-2">
                    {order.cartItems.map((item, index) => (
                      <Card
                        key={index}
                        className="flex flex-row  items-center  p-1.5">
                        <Image src={item.product.imageCover} width={50} height={50} alt={item.product.title}/>
                        <div>
                          <p className="font-medium">
                            {item.product.title.split(' ',2).join(' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.count}
                          </p>
                        </div>
                        <p className="font-semibold ms-auto">
                          {item.price} EGP
                        </p>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                {/* Total */}
                <div className="flex justify-between font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>{order.totalOrderPrice} EGP</span>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
   }
    </>
  )
}

