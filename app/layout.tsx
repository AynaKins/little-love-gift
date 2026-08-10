import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Как я тебя люблю",
  description: "Очень маленькая книжка о большом чувстве.",
  openGraph: {
    title: "Как я тебя люблю",
    description: "Очень маленькая книжка о большом чувстве.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Как я тебя люблю — маленькая книжка" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Как я тебя люблю",
    description: "Очень маленькая книжка о большом чувстве.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
