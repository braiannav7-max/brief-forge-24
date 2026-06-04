import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen w-full flex bg-background">
      <AppSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <AppTopbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
