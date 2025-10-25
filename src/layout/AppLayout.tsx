import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AppSidebar />
      <Backdrop />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Header */}
        <AppHeader />
        
        {/* Page Content */}
        <main className="min-h-[calc(100vh-64px)]">
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6 lg:p-8 ">
            <div className=" grid-cols-12 gap-4 md:gap-6 contents">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
