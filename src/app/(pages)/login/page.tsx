"use client"
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import {signIn}  from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { formSchema } from '@/components/Schema/page'

export default function Login() {
  const searchParams = useSearchParams()
   const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
      redirect:true
    })
    setLoading(false)
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-[75vh]'>
        <Card className='p-8 w-sm shadow '>
        <h1 className='text-center mb-5'>Welcome Back !</h1>
          <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className='w-full' type='password'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              <Link href="/forgotPassword"><p className='text-blue-500  text-end pb-3 '>Forgot Password?</p></Link>
              <Button className='w-full my-4' disabled={loading} type="submit">{loading && <Loader className='animate-spin' />}Login </Button>
              {searchParams.get('error') && <p className='text-red-600 text-center text-lg font-semibold'>{ searchParams.get('error')}</p>}
          <p className='text-center'>If you don't have account, <Link href="/register" className='text-blue-500 font-medium'>SignUp</Link> Now</p>
      </form>
    </Form>
        </Card>
    </div>
    </>
  )
}
