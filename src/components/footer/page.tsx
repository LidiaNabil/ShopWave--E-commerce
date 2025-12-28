import React from 'react'
import Link from "next/link"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <>
       <footer className="bg-muted/20 pt-6">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">ShopWave</h2>
          <p className="text-sm text-muted-foreground">
            Your one-stop destination for the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer service.
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin size={16} />
              123 Shop Street, Octoper City, DC 12345
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} />
              (+20) 01093333333
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} />
              support@shopwave.com
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">SHOP</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#">Electronics</Link></li>
            <li><Link href="#">Men's Fashion</Link></li>
            <li><Link href="#">Women's Fashion</Link></li>
            <li><Link href="#">Home </Link></li>
            <li><Link href="#">Beauty & Health</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Help Center</Link></li>
            <li><Link href="#">Track Your Order</Link></li>
            <li><Link href="#">Returns & Exchanges</Link></li>
            <li><Link href="#">Size Guide</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">ABOUT</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#">About ShopWave</Link></li>
            <li><Link href="#">Careers</Link></li>
            <li><Link href="#">Press</Link></li>
            <li><Link href="#">Investor Relations</Link></li>
            <li><Link href="#">Sustainability</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">POLICIES</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Cookie Policy</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Refund Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShopWave. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  )
}
