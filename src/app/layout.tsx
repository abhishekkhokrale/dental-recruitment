import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  M_PLUS_Rounded_1c,
  BIZ_UDPGothic,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
} from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const mplusRounded = M_PLUS_Rounded_1c({
  variable: "--font-mplus-rounded",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const bizUDGothic = BIZ_UDPGothic({
  variable: "--font-biz-ud",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const zenKakuGothic = Zen_Kaku_Gothic_New({
  variable: "--font-zen-gothic",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ブルージョブズ | 歯科求人・転職サイト",
  description:
    "歯科衛生士・歯科医師・歯科助手の求人情報を多数掲載。ブルージョブズであなたにぴったりの歯科クリニックへの転職・就職をサポートします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={[
        notoSansJP.variable,
        notoSerifJP.variable,
        mplusRounded.variable,
        bizUDGothic.variable,
        zenKakuGothic.variable,
        shipporiMincho.variable,
        geistMono.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
