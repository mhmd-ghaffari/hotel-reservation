import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="h-full md:grid md:grid-cols-[16rem_1fr] md:gap-12">
      {/* Side Navigation */}
      <SideNavigation />

      {/* Main Content */}
      <div className="py-1">{children}</div>
    </div>
  );
}
