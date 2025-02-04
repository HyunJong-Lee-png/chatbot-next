'use client'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
// import { Sidebar } from "./Sidebar"
import { Menu } from "lucide-react"
import { useOpenStore } from "@/store/sheet"
import { ReactNode } from "react"


export function MobileMenu({ children }: { children: ReactNode }) {
  const { open, updateOpen } = useOpenStore();
  console.log('모바일메뉴')
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => updateOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={'left'} className="p-0">
          <SheetTitle />
          {children}
        </SheetContent>
      </Sheet>
    </div>
  )
}