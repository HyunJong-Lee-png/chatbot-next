

import { BASE_URL, CHAT_ROUTES } from "@/constant/route";
import { Logo } from "./Logo";
import { MessageSquare, Plus } from 'lucide-react';
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";
// import { useConversationStore } from "@/store/conversation";
import { getConversations } from "@/actions/conversation";

const DUMMY_ITEMS =
{
  id: 'new',
  label: '새로운 대화',
  icon: <Plus />,
  href: BASE_URL
}


export async function Sidebar() {
  console.log('사이드바')

  const result = await getConversations();

  return <nav className="h-full p-3 bg-black flex flex-col text-white">
    {/* 로고영역+버튼영역 */}
    <div className="flex-1 overflow-y-auto">
      <Logo />
      <div className="flex flex-col gap-2 mt-10">
        <SidebarItem
          item={{ label: DUMMY_ITEMS.label, href: DUMMY_ITEMS.href, id: DUMMY_ITEMS.id, icon: DUMMY_ITEMS.icon }} />
        {result?.map(item => (
          <SidebarItem
            key={item.id} item={{ label: item?.name, href: `${CHAT_ROUTES.CONVERSATIONS}/${item.id}`, id: item.id, icon: <MessageSquare /> }} />
        ))}
      </div>
    </div>
    {/* 로그아웃 영역 */}
    <div className="flex justify-center"><LogoutButton /></div>
  </nav>
}