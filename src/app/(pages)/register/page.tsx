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
import { useRouter} from 'next/navigation'
import { Loader } from 'lucide-react'
import Link from 'next/link'

const formSchema = z.object({
      name: z.string()
      .nonempty("Name is required")
      .min(3, "Name not less than 3 letters")
      .max(20, "Name not more than 20 letters"),
  email: z.string()
        .nonempty("Email is required")
        .regex(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address like name@example.com"
        ),
  password: z.string()
    .nonempty('Password is required')
    .min(8, {message: "Password must be at least 8 characters.",
    }).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Password must contain at least one number and one character"),
  rePassword: z.string()
    .nonempty("RePassword is required"),
  phone: z.string()
    .nonempty("Phone Number is required")
  .regex(
    /^01[0125][0-9]{8}$/,
    'Accept only Egyptian phone numbers'
  ),
})
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    { path: ["rePassword"], message: "Password and RePassword do not match" }
  );

export default function Register() {
   const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const router=useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    const userData= {
      name: values.name,
      email: values.email,
      password: values.password,
      rePassword: values.rePassword,
      phone: values.phone,
    }
          let res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          {
            method: 'POST',
            body: JSON.stringify(userData),
             headers: {
          'Content-Type': 'application/json',
        },
    }
    )
    let data = await res.json()
    if (data.message == 'success') router.push('/login')
    else setErrMsg(data.message)
    setLoading(false)
  }


  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-[75vh]'>
        <Card className='p-8 w-sm shadow '>
        <h1 className='text-center mb-5'>Create Your Account <br /> and Join US</h1>
          <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className='w-full'{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input className='w-full' type='password'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input className='w-full' type='phone'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
              />
              <Button className='w-full my-4' disabled={loading} type="submit">{loading && <Loader className='animate-spin' />}SignIn </Button>
              {errMsg && <p className='text-red-600 text-center text-lg font-semibold'>{ errMsg}</p>}
          <p className='text-center'>Have already an account ? <Link href="/login" className='text-blue-500 font-medium'>SignIn</Link></p>
      </form>
    </Form>
        </Card>
    </div>
    </>
  )
}
