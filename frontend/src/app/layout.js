import "./globals.css"
import { Inter } from "next/font/google"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sudoku Solver",
  description: "A Sudoku solver built with Next.js",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

