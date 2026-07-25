import NavbarWrapper from "@/components/ui/navbar/NavbarWrapper";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />

      <main className="min-h-screen flex-1 pt-20">
        {children}
      </main>
    </>
  );
}