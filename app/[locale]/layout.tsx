import { Inter as FontSans } from "next/font/google"
import { cn } from "@lib/utils"
import { type LayoutProps } from "types/common"
import { headers } from "next/headers"
import useAuth from "@lib/store/auth"
import { Toaster } from "@components/ui/sonner"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  // const headersList = headers()
  // const header_url = headersList.get("x-pathname") || ""

  // const isDashboard = header_url === `/${locale}`

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn("dark min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
