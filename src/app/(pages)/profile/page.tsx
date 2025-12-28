"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Profile() {
   const session=useSession()
  return (
    <>
        <div className="max-w-md mx-auto p-6 space-y-6">
      <Card className="rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-15 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary" />
            </div>
            <div>
              <h1 >{session.data?.user.name}</h1>
              <p className="text-lg text-muted-foreground">
                {session.data?.user.role}
              </p>
            </div>
          </div>
          <div className="space-y-2  text-muted-foreground">
            <p className="flex items-center gap-2">
              <Mail size={20} />
              {session.data?.user.email}
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/allorders">
          <Button className="w-full">My Orders</Button>
        </Link>
        <Link href="/addresses">
          <Button variant="outline" className="w-full">
            My Addresses
          </Button>
        </Link>
      </div>
    </div>

    </>
  )
}
