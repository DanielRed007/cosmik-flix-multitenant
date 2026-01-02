// components/app-sidebar.tsx

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, BarChart, Settings } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-6 bg-gradient-to-br from-lime-100 via-electric-green-600 to-lime-300">
        <h2 className="text-xl font-bbh-bartle mt-3">Cosmik</h2>
      </SidebarHeader>

      <SidebarContent className="flex items-center px-6 bg-gradient-to-br from-lime-100 via-electric-green-600 to-lime-300">
          <SidebarMenu>
            
            <SidebarMenuItem className="bg-electric-green mt-3 font-bold">
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem className="bg-electric-green mt-1 font-bold">
              <SidebarMenuButton asChild>
                <a href="/dashboard/my-list">
                  <Home className="mr-2 h-4 w-4" />
                  <span>My List</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground text-center">
          © 2025 MyApp
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}