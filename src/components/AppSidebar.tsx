
import { useState } from "react";
import { Home, BarChart3, FileText, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Individual material analysis", url: "/individual-analysis", icon: FileText },
  { title: "Comprehensive analysis", url: "/comprehensive-analysis", icon: BarChart3 },
  { title: "History/reports", url: "/dashboard", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [menuOpen, setMenuOpen] = useState(true);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-blue-600 text-white font-medium hover:bg-blue-700" 
      : "text-gray-700 hover:bg-gray-100";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="offcanvas">
      <SidebarContent className="bg-white">
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && (
            <>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Menu</span>
              </div>
            </>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4 mr-3" />
                      {!isCollapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
