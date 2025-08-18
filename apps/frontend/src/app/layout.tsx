import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Social Media Manager - Potencia tus redes sociales con IA",
  description: "Optimiza tu presencia digital con recomendaciones inteligentes de horarios y contenido",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${manrope.variable} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
