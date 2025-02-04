'use client'
import Link from "next/link";
import { KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useOpenStore } from "@/store/sheet";
import { deleteConversation, updateConversation } from "@/actions/conversation";
import toast from "react-hot-toast";
import { useModalStore } from "@/store/modal";
import { Modal } from "../modal/Modal";
import { CHAT_ROUTES } from "@/constant/route";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    label: string | null;
  }
}

export function SidebarItem({ item }: Props) {
  const { id, href, icon, label } = item;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newLabel, setNewLabel] = useState(label);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { open, openModal, config, closeModal } = useModalStore();

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  }

  const updateOpen = useOpenStore(state => state.updateOpen);

  const handleEdit = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsEditOpen(prev => !prev);
    setIsMenuOpen(false);
  }
  useEffect(() => {
    if (isEditOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditOpen])

  const handleBlur = async () => {
    if (label !== newLabel) {
      try {
        await updateConversation(params.id, newLabel || '');
      } catch (e) {
        toast.error('이름 수정 실패~')
      }
    }
    setIsEditOpen(false);
  }
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleBlur();
    }
  }

  const handleDelete = async () => {
    try {
      toast.success('삭제에 성공했습니다');
      await deleteConversation(id);
    } catch (e) {
      console.error(e);
      toast.error('삭제에 실패했습니다');
    }
    params.id === id ? router.push('/') :
      !params.id ? router.push('/') : router.push(`${CHAT_ROUTES.CONVERSATIONS}/${params.id}`)

  }


  return <Link
    aria-hidden={false}
    href={href}
    scroll={false}
    onClick={() => updateOpen(false)}
    className={cn("flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg"
      , isMenuOpen || pathname === href ? "text-white bg-white/10" : "text-zinc-400"
    )}
  >
    {/* label영역 */}
    <div className="flex items-center gap-2" aria-hidden={false}>
      {icon}
      {isEditOpen ?
        <>
          <input
            ref={inputRef}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.preventDefault()}
            className=" bg-transparent px-2 py-1 rounded-lg border-zinc-400 border"
            value={newLabel ?? ''}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          {/* <MousePointerClick onClick={(e) => { e.preventDefault(); handleBlur(); }} size={15} /> */}
        </>
        : <div className="truncate w-[180px]"> {newLabel}</div>}
    </div>
    {/* 드롭다운 메뉴 영역 */}
    {id !== 'new' &&
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} aria-hidden={false}>
        <DropdownMenuTrigger asChild>
          <div onClick={handleMenu}>
            <Ellipsis className={cn("group-hover:block text-grey-400 hover:text-white"
              , isMenuOpen ? "block text-white" : "md:hidden text-gray-400")} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil size={18} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <Trash size={18} />
            <div onClick={handleDelete}>삭제</div>
            {/* <Modal conversation={{ current: params.id, thisCon: id }} /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
  </Link>
}