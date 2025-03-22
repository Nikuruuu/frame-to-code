"use client";
import { useAuthContext } from "@/app/provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  // List of public paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup", "/reset-password"];

  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublicPath) {
      // If not loading and no user, and not on a public path, redirect to home
      router.push("/");
    }
  }, [user, loading, router, pathname, isPublicPath]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // For non-public paths, only render children if user is authenticated
  if (!isPublicPath && !user) {
    return null; // Don't render anything while redirecting
  }

  // For public paths or authenticated users, render children
  return <>{children}</>;
}
