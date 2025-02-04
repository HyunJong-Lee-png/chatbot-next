import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  console.log('AuthLayout.tsx')
  return <div className="flex items-center justify-center h-full">{children}</div>
}