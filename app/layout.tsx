import type React from "react"
import "./globals.css"
import "./tailwind-fix.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getSiteSettings } from "@/lib/sanity"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteTitle = siteSettings?.title || "O B J E C T"
  const siteDescription = siteSettings?.description || "design and engagement solutions"
  const siteKeywords = siteSettings?.keywords || ""
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blokhouse.xyz"

  // Get favicon URLs if they exist
  const faviconUrl = siteSettings?.favicon?.mainIcon?.asset?.url
  const appleTouchIconUrl = siteSettings?.favicon?.appleTouchIcon?.asset?.url

  // Get social image if it exists
  const socialImageUrl = siteSettings?.socialImage?.asset?.url

  // Add metadataBase to fix the warning during build
  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: siteKeywords ? siteKeywords.split(",").map((keyword) => keyword.trim()) : [],
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      url: siteUrl,
      siteName: siteTitle,
      images: socialImageUrl ? [{ url: socialImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: socialImageUrl ? [socialImageUrl] : undefined,
    },
    // Add favicon icons if they exist
    icons: {
      icon: faviconUrl ? [{ url: faviconUrl }] : undefined,
      apple: appleTouchIconUrl ? { url: appleTouchIconUrl } : undefined,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <body className={inter.className} style={{ overflow: "hidden", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
