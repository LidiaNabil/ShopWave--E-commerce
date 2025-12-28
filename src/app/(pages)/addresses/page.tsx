"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Trash2, Plus, Loader } from "lucide-react"
import { addAddressAction } from "./_action/AddAddress.action"
import { deleteAddressAction } from "./_action/DeleteAddress.action"
import { getAllAddressAction } from "./_action/GetAllAddresses.action"
import { ShippingAddressI } from "@/interfaces"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"


export default function UserAddresses() {
  const [addresses, setAddresses] = useState<ShippingAddressI[]>([])
  const [loading, setLoading] = useState(true)
  const [addLoading, setAddLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    city: "",
    details: "",
    phone: "",
  })


  async function getAddresses() {
      const data = await getAllAddressAction()
      if (data.status == 'success') setAddresses(data.data)
    setLoading(false)
  }

  async function addAddress() {
    if (!form.name || !form.city || !form.details || !form.phone) {
      toast.error('All inputs are required')
      return
    }
    setAddLoading(true)
       const  data  = await addAddressAction(form)
if (data.status === "success") {
  setForm({ name:'', city:'', details:'', phone:'' })
  setAddresses(data.data)
    }
    setAddLoading(false)
  }

  async function deleteAddress(id: string) {
    setDeleteLoadingId(id)
  const  data  = await deleteAddressAction(id)
 if (data.status === "success") setAddresses(data.data)
    setDeleteLoadingId(null)
  }

  useEffect(() => {
    getAddresses()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">My Addresses</h1>
      <Card className="rounded-2xl ">
        <CardHeader>
          <CardTitle>Add New Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            className="w-full "
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
             className="w-full "
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <Input
            className="w-full "
            placeholder="Details"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          />
          <Input
             className="w-full "
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </CardContent>
          <Button onClick={addAddress} disabled={addLoading} className="w-2/4 mx-auto">
            {addLoading?<Loader className="animate-spin"/>:<Plus size={16} />} Add Address
          </Button>
      </Card>


      {loading ?
        <div className=" text-center pt-5">
          <Badge className=" bg-gray-400 text-sm px-3">
        <Spinner className="size-8" />
        Loading...
          </Badge>
        </div>
       :
        addresses.length!=0 ?
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address._id} className="rounded-2xl">
              <CardHeader className="flex flex-row justify-between">
                <CardTitle>{address.name}</CardTitle>
                <Badge>{address.city}</Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="flex gap-2 items-center">
                  <MapPin size={16} />
                  {address.details}
                </p>
                <p className="flex gap-2 items-center">
                  <Phone size={16} />
                  {address.phone}
                </p>
              </CardContent>
                <Button
                variant="destructive"
                size="sm"
                disabled={deleteLoadingId == address._id}
                  onClick={() => deleteAddress(address._id)}
                  className="mt-3 w-2/4 mx-auto text-center">
                  {deleteLoadingId == address._id?<Loader className="animate-spin"/>:<Trash2 size={14} />} Delete
                </Button>
            </Card>
          ))}
          </div>
          :
          <h1 className="pt-5 text-center text-gray-600">No addresses added yet</h1>
      }
    </div>
  )
}
