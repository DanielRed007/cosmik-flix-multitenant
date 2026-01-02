import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { UserNav } from "@/components/dashboard/user-nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <header className="bg-gradient-to-br from-lime-300 via-electric-green-300 to-lime-300 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4 gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 bg-gradient-to-br from-lime-700 via-lime-300 to-lime-700">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}