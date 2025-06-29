import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ReaCheck",
  description: "Test your ability to detect AI generated content",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* OmniDim Widget Script */}
        <script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=275f5df0fa10b539de4348138f49be73" ></script>
      </body>
    </html>
  )
}
