import Footer from "@/components/layout/footer";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="pt-16 pb-8 md:pt-28">{children}</main>
      <Footer />
    </>
  );
}
