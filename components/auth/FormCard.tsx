import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";


type Props = {
  title: string;
  footer: {
    label: string,
    href: string
  },
  children: ReactNode
}

export function FormCard({ title, footer, children }: Props) {
  return <Card className="w-[500px] flex flex-col items-center border">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="w-[90%]">
      {children}
    </CardContent>
    <CardFooter>
      <p ><Link className="text-sm text-sky-700" href={footer.href}>{footer.label}</Link></p>
    </CardFooter>
  </Card>

}