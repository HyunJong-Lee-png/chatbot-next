'use client'
import { deleteSession, verifySession } from "@/actions/sessions";
import { Button } from "../ui/button";

export function LogoutButton() {

  const logout = async () => {
    const confirm = window.confirm('정말 로그아웃 하시겠습니까?');
    if (confirm) {
      await deleteSession();
    }
  }

  return <Button className="w-[80%]" onClick={logout}>로그아웃</Button>
}