import { useEffect, useState, type ReactNode } from "react";
import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppTopbar } from "@/components/app/AppTopbar";
import { useAuth } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, authAvailable, authError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && authAvailable) {
      router.navigate({ to: "/login" });
    }
  }, [user, loading, authAvailable, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!authAvailable) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
        <p className="text-muted-foreground text-[13px] max-w-sm">
          {authError ?? "Auth no disponible."} — agregalas en tu <code className="bg-muted px-1.5 py-0.5 rounded text-[12px]">.env</code> y reiniciá el servidor.
        </p>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <AppTopbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
