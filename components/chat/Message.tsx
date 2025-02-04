// import { verifySession } from "@/actions/sessions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useEffect, useState } from "react";


type Props = {
  name?: string;
  content?: string
  role: string
}

export function Message({ name = 'User', content = '', role }: Props) {
  // const [userName, setUserName] = useState('');
  const isAssistant = role === 'assistant';
  const avatarName = isAssistant ? "Chat GPT" : name;

  //이렇게 유저의 이름을 가져오는 방법도 있지만 매번 서버요청을 해야하므로
  //useUserStore를 만들어 처음진입시에만 유저이름을 가져오게끔 이 코드는 버리고 바꿔주자
  // useEffect(() => {
  //   (async function () {
  //     const session = await verifySession();
  //     setUserName(session.name);
  //   })();
  // }, [])

  return <div className="mb-5 flex items-start gap-2">
    {/* 아바타 */}
    <Avatar>
      <AvatarImage src={isAssistant ? '/logo.png' : undefined} alt="avatar" />
      <AvatarFallback>{avatarName[0]}</AvatarFallback>
    </Avatar>

    {/* 이름 + 내용 */}
    <div className="mt-2">
      <h2 className="font-bold">{avatarName}</h2>
      <div className="mt-2 whitespace-break-spaces">{content}</div>
    </div>
  </div>
}