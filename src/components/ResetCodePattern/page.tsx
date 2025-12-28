"use client"
import React, { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ResetCodePattern({code,setCode}:{code:string ,setCode:(value:string)=>void}) {

  return (
      <>
          <div className='mx-auto'>
      <InputOTP   value={code} onChange={(value) => setCode(value)} maxLength={6} >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
 </div>
      </>
  )
}
