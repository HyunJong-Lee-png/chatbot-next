import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { deleteConversation } from "@/actions/conversation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CHAT_ROUTES } from "@/constant/route";

type Props = {
  conversation: {
    current: string;
    thisCon: string;
  }
}

export function Modal({ conversation: { current, thisCon } }: Props) {

  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteConversation(thisCon);
      toast.success('삭제에 성공했습니다');
    } catch (e) {
      console.error(e);
      toast.error('삭제에 실패했습니다');
    }
    current === thisCon ? router.push('/') :
      !current ? router.push('/') : router.push(`${CHAT_ROUTES.CONVERSATIONS}/${current}`)

  }

  return <Dialog>
    <DialogTrigger>Delete</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button className="text-red-500 font-bold" onClick={handleDelete}>삭제</Button>
        <DialogClose><span className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md">취소</span></DialogClose>
      </DialogFooter>

    </DialogContent>
  </Dialog>

}