import React from 'react'
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
import { Button } from '../ui/button'
import { Loader, Trash2Icon } from 'lucide-react'

export default function Clear({  clearFn ,loading}: {  clearFn: () => {}  ,loading:boolean }) {
  return (
      <>
      <Dialog>
        <DialogTrigger asChild>
            <Button className='ms-auto w-30 shadow rounded-2xl border  bg-transparent hover:bg-gray-200 text-red-700 '> <Trash2Icon /> clear cart</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-red-700 text-2xl font-bold'>Alert !</DialogTitle>
            <DialogDescription>
              Are you sure you , want to clear the cart .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={clearFn}   variant="destructive" >{loading && <Loader className='animate-spin' /> }Clear</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
      </>
  )
}
