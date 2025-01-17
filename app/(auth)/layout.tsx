import { auth } from "@/lib/auth";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session?.user) {
    return redirect("/home");
  }
  return (
    <div className="w-full h-screen">
      <div className="h-full mx-auto">{children}</div>
    </div>
  );
}

export default AuthLayout;
