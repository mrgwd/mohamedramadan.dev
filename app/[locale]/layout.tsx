import "../globals.css";
import type { Metadata } from "next";
import ConsoleBanner from "@/components/consoleBanner";
import Decoration from "@/components/decoration/decoration";
import FallingStars from "@/components/decoration/fallingStars";
import GTag from "@/scripts/gtag";
import opengraphImage from "@/app/opengraph-image.jpg";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ViewTransition } from "react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return {
    title: {
      template: t("common.metadata.template"),
      default: t("common.metadata.default"),
    },
    description: t("home.metadata.description"),
    keywords: t.raw("home.metadata.keywords"),
    metadataBase: new URL("https://mohamedramadan.dev"),
    openGraph: {
      images: {
        url: opengraphImage.src,
        alt: "Opengraph Image",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="overflow-x-hidden antialiased">
        <NextIntlClientProvider>
          <Decoration>
            <FallingStars />
          </Decoration>
          <ViewTransition>{children}</ViewTransition>
          <ConsoleBanner />
        </NextIntlClientProvider>
        <GTag />
      </body>
    </html>
  );
}
