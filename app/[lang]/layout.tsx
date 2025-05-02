import type React from "react"
import { getDictionary } from "@/lib/dictionaries"
import { locales } from "@/middleware"

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: "en" | "tr" }
}>) {
  // Get the dictionary based on the locale
  const dict = await getDictionary(params.lang)

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
