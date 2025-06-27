
import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <header className="h-16 border-b bg-gray-900 text-white flex items-center px-4">
        <SidebarTrigger className="text-white hover:bg-gray-800 mr-4" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <span className="text-gray-900 text-sm font-bold">=</span>
          </div>
          <span className="font-medium">Predictive Analytics Interface</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          <span className="text-sm">Username</span>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;
