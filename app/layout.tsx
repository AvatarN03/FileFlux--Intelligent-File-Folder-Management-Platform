import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CyanCloud - FileUploader Platform",
  description: "The file uploader platform in nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${sora.className} antialiased`}>
        
          {children}
          
      </body>
    </html>
  );
}
