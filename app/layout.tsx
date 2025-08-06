import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexmakesugc.com"),
  title:
    "Alex Ferraro - UGC Creator Men's Content | Authentic UGC Videos & Brand Partnerships",
  description:
    "Professional UGC creator specializing in men's care, tech, and fashion content. Bilingual Italian-English creator with 2M+ views. Authentic UGC videos that convert for brands targeting men. Book Alex Ferraro for your next UGC campaign.",
  keywords: [
    "UGC creator",
    "UGC men",
    "men's UGC content",
    "user generated content creator",
    "UGC creator men's care",
    "male UGC creator",
    "UGC creator tech",
    "UGC creator fashion",
    "bilingual UGC creator",
    "Italian UGC creator",
    "men's lifestyle UGC",
    "authentic UGC videos",
    "UGC content creator men",
    "Alex Ferraro UGC",
    "professional UGC creator",
    "men's skincare UGC",
    "tech UGC creator",
    "fashion UGC creator men",
  ],
  authors: [{ name: "Alex Ferraro" }],
  creator: "Alex Ferraro",
  publisher: "Alex Ferraro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "it_IT",
    url: "https://alexmakesugc.com",
    siteName: "Alex Ferraro - UGC Creator",
    title:
      "Alex Ferraro - Top UGC Creator for Men's Brands | Authentic Content That Converts",
    description:
      "Professional UGC creator specializing in men's care, tech, and fashion. Bilingual creator with 2M+ views creating authentic content that drives real engagement and conversions for men's brands.",
    images: [
      {
        url: "/hero.JPG",
        width: 1200,
        height: 630,
        alt: "Alex Ferraro - Professional UGC Creator for Men's Brands",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Ferraro - UGC Creator Men's Content | Authentic UGC Videos",
    description:
      "Professional UGC creator specializing in men's care, tech, and fashion content. Bilingual Italian-English creator with 2M+ views.",
    images: ["/hero.JPG"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://alexmakesugc.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Ferraro",
              jobTitle: "UGC Creator",
              description:
                "Professional UGC creator specializing in men's care, tech, and fashion content",
              url: "https://alexmakesugc.com",
              sameAs: [
                "https://www.instagram.com/alexmakesugc_/",
                "https://www.tiktok.com/@alexmakesugc_",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance UGC Creator",
              },
              knowsAbout: [
                "User Generated Content",
                "UGC for Men's Brands",
                "Men's Care Content Creation",
                "Tech Content Creation",
                "Fashion Content Creation",
                "Bilingual Content Creation",
              ],
              expertise: [
                "UGC Creation",
                "Men's Content",
                "Brand Partnerships",
                "Social Media Marketing",
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
