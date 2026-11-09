import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://verzystore.id"),
  title: `${siteConfig.name} - ${siteConfig.headline}`,
  description: siteConfig.description,
  keywords: [
    "top up game",
    "voucher game murah",
    "top up diamond mlbb",
    "top up free fire",
    "voucher steam",
    "top up game indonesia",
    "verzy store",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.headline}`,
    description: siteConfig.description,
    url: "https://verzystore.id",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.heroIllustration,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/images/logo.jpg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('verzy_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-primary dark:bg-dark-bg dark:text-dark-text">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
