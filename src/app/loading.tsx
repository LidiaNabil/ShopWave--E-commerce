import React from 'react'
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
      <>
        <div className="flex justify-center gap-6 items-center h-100 ">
          <Spinner className="size-10 text-blue-500" />
        </div></>
  )
}
