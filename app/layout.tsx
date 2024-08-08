import type { LayoutProps } from "types/common"
import "styles/tailwind.css"
import "./globals.css"

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <>
      {children}
    </>
  )
}
