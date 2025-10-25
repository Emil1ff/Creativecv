import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppSidebar />
      <Backdrop />

      <div
        className={`transition-all duration-300 ease-in-out h-screen overflow-hidden flex flex-col ${
          isExpanded || isHovered ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        <AppHeader />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6 lg:p-8 h-full">
            <div className="grid-cols-12 gap-4 md:gap-6 contents h-full">
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
