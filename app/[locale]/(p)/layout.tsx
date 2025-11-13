import Footer from "@/components/layout/footer";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <>
      <main className="pt-16 pb-8 md:pt-28">{children}</main>
      <Footer />
    </>
  );
}
