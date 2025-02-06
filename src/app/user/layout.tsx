import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Container from "@/components/ui/container";
import Sidebar from "./_components/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full ">
      <Header />
      <Container className="py-5 grid grid-cols-12 flex-1 ">
        <Sidebar />
        <div className="col-span-6">{children}</div>
        <div className="col-span-3"></div>
      </Container>
      <Footer />
    </div>
  );
}
