import NavbarWrapper from "@/components/ui/navbar/NavbarWrapper";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarWrapper />
      <main className="flex-1">{children}</main>
    </>
  );
}