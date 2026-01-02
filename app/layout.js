import { Mulish, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Appwrapper } from "./Context";
import Message from "./_globalcomps/Message";
import { Googleadsid } from "@/lib/data";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  weight: "400", // Tenor Sans has only one weight
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Tecknologia",
  description: "Search you next tech product",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* google adsense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Googleadsid}`}
          crossOrigin="anonymous"
        ></script>
        <meta name="google-adsense-account" content={Googleadsid} />
      </head>
      <body
        className={`${mulish.variable} ${tenor.variable} antialiased w-full max-w-[1920px] mx-auto text-text`}
      >
        <Appwrapper>
          <Message />
          {children}
        </Appwrapper>
      </body>
    </html>
  );
}
