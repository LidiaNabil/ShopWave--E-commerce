"use client"
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import ResetCodePattern from '@/components/ResetCodePattern/page'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from '@/components/Schema/page'
import { z } from "zod"
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
    const router=useRouter()
   const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [step, setStep] = useState(1)
    const emailInput = useRef<HTMLInputElement | null>(null)
    const [code, setCode] = useState('')


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function forgotPassword() {
      setLoading(true)
      const email = emailInput.current?.value
      if(!email) setErrMsg('Email is required')
      else {
            let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPasswords`,
          {
            method: 'POST',
              body: JSON.stringify({email}),
             headers: {
          'Content-Type': 'application/json',
        },
    }
    )
    let data = await res.json()
          if (data.statusMsg == 'success')
          {
              toast.success(data.message)
              setErrMsg('')
              setStep(2)
            }
      else setErrMsg(data.message)
}
    setLoading(false)
    }

  async function verifyCode() {
      setLoading(true)
      if(!code) setErrMsg('Reset Code is required')
      else {
            let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verifyResetCode`,
          {
            method: 'POST',
              body: JSON.stringify({resetCode:code}),
             headers: {
          'Content-Type': 'application/json',
        },
    }
    )
    let data = await res.json()
          if (data.status == 'Success')
          {
              toast.success('you can reset your password now')
              setErrMsg('')
              setStep(3)
            }
      else setErrMsg(data.message)
  }
    setLoading(false)
    }

  async function resetPassword(values: z.infer<typeof formSchema>) {
      setLoading(true)
      const email = values.email
      const newPassword = values.password
            let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,
          {
            method: 'PUT',
              body: JSON.stringify({email,newPassword}),
             headers: {
          'Content-Type': 'application/json',
        },
    }
    )
    let data = await res.json()
          if (data.token)
          {
              toast.success('your password has changed successfully \n login now ')
                router.replace('/login')
            }
      else setErrMsg(data.message)
    setLoading(false)
    }

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-[75vh] '>
        <Card className='p-8 w-sm shadow '>
                  {step == 1 &&
                      <>
                      <h1 className='text-center mb-3'>Forgot Password?</h1>
                <Label htmlFor="email">Email</Label>
                <Input  ref={emailInput} className='w-full' id="email" name="email" placeholder="name@example.com" />
                  <Button onClick={forgotPassword} className='w-full mt-3' disabled={loading} type="submit">{loading && <Loader className='animate-spin' />}Forgot Password </Button>
                          {errMsg && <p className='text-red-600 text-center text-md font-medium'>{errMsg}</p>}
                      </>}
                  {step == 2 &&
                      <>
                      <h1 className='text-center mb-3'>Verify Reset Code</h1>
                      <ResetCodePattern code={code} setCode={(value: string) => { setCode(value) }} />
                  <Button onClick={ verifyCode} className='w-full mt-3' disabled={loading} >{loading && <Loader className='animate-spin' />}Verify Code </Button>
                          {errMsg && <p className='text-red-600 text-center text-md font-medium'>{errMsg}</p>}
                      <p className='text-blue-500 text-center  cursor-pointer' onClick={()=>setStep(1)}>Resend Reset Code</p>
                      </>}
                  {step == 3 &&
                      <>
                      <h1 className='text-center mb-3'>Reset Password</h1>
                      <Form {...form} >
                          <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-6 ">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input className='w-full' placeholder="name@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <FormControl>
                                    <Input className='w-full' type='password'  {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                                  />
                                      <Button  type='submit' className='w-full mt-3' disabled={loading} >{loading && <Loader className='animate-spin' />}Reset Password </Button>
                                     {errMsg && <p className='text-red-600 text-center text-md font-medium'>{errMsg}</p>}
                          </form>
                        </Form>
                      </>}
        </Card>
    </div>
    </>
  )
}
