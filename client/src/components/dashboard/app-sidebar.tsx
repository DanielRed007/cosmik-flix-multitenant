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
import { BadgeCheck, List, Search } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-6 bg-gradient-to-br from-lime-100 via-electric-green-600 to-lime-300">
        <h2 className="text-xl font-bbh-bartle mt-3">Cosmik</h2>
      </SidebarHeader>

      <SidebarContent className="flex items-center px-6 bg-gradient-to-br from-lime-100 via-electric-green-600 to-lime-300">
          <SidebarMenu>

            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className="mt-3 hover:bg-transparent hover:text-inherit data-[active]:bg-transparent data-[active]:text-inherit"
              >
                <a href="/dashboard/search">
                  <Search className="mr-2 h-4 w-4" />
                  <span className="font-bold">Search</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className="hover:bg-transparent hover:text-inherit data-[active]:bg-transparent data-[active]:text-inherit"
              >
                <a href="/dashboard">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  <span className="font-bold">Featured</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className="hover:bg-transparent hover:text-inherit data-[active]:bg-transparent data-[active]:text-inherit"
              >
                <a href="/dashboard/my-list">
                  <List className="mr-2 h-4 w-4" />
                  <span className="font-bold">My List</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-gradient-to-br from-lime-100 via-electric-green-600 to-lime-300">
        <p className="text-xs text-muted-foreground text-center">
          © 2025 MyApp
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}