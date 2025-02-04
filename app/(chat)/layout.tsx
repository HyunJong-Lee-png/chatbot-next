import { Header } from "@/components/chat/Header";
import { Sidebar } from "@/components/chat/Sidebar";
import { UserProvider } from "@/components/chat/UserProvider";
import Link from "next/link";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  console.log('Chatlayout.tsx');

  return <UserProvider>
    <div className="md:flex h-full">
      {/* 사이드바영역 */}
      <div className="hidden md:block w-[300px]"><Sidebar /></div>
      {/* Header + Chat영역 */}
      <div className="flex flex-col flex-1 h-full overflow-y-auto relative" >
        <Header />
        {children}
      </div>
    </div>
  </UserProvider>
}