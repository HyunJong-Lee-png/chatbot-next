'use client'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
// import TextareaAutosize from 'react-textarea-autosize';
// import { DUMMY_LOGN_TEXT } from "@/constant/dummy";
import { useChat } from 'ai/react'
import { useModelStore } from "@/store/model";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constant/route";
// import { useMessageStore } from "@/store/message";
import { getMessages } from "@/actions/conversation";
import { useUserStore } from "@/store/user";

// const DUMMY_MESSAGE = [
//   {
//     id: '1',
//     content: '더미데이터1',
//     role: 'user'
//   },
//   {
//     id: '2',
//     content: '더미데이터2',
//     role: 'assistant'
//   },
//   {
//     id: '3',
//     content: '더미데이터3',
//     role: 'user',
//   },
//   {
//     id: '4',
//     content: DUMMY_LOGN_TEXT,
//     role: 'assistant'
//   }
// ]

export function Chat() {
  // const [value, setValue] = useState('');
  const divRef = useRef<HTMLDivElement>(null);
  const model = useModelStore((state) => state.model);

  //챗봇을 만드는데 필요한 훅들
  const user = useUserStore(state => state.user);
  const params = useParams<{ id: string }>();
  console.log('파람스', params.id)
  const [initMessages, setInitMessages] = useState<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    role: "user" | "assistant";
    conversationId: string;
  }[]>([]);
  useEffect(() => {
    (async function () {
      const result = await getMessages(params.id);
      setInitMessages(result);
    })();
  }, [params.id]);

  const a = initMessages.map(message => ({ id: message.id, role: message.role, content: message.content }));
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: {
      model,
    },
    initialMessages: a,
    onFinish: async (message) => {
      // 이 속성에서 message는 assistant메세지임
      console.log('여기가 언제 실행되나', 'input값:', input)
      if (!params.id) {
        // param이 없으면 새로운 대화 페이지
        //  1.create conversation
        const conversation = await createConversation(input);
        // 2.add message
        await addMessages(conversation.id, input, message.content);
        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);

      } else {
        // param이 있으면 기존 대화 페이지

        // add message
        await addMessages(params.id, input, message.content);

      }
    }
  });
  useLayoutEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])



  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {messages?.length === 0 && !params.id ? <Empty />
          : messages?.map(message =>
            <Message
              key={message.id}
              role={message.role}
              content={message.content}
              name={user.name}
            />
          )}
      </div>
      {/* input 영역 */}
      <div className="pb-5 sticky bottom-0 bg-white"  >
        <form className="flex items-center justify-center gap-4" onSubmit={handleSubmit}>
          <AutoResizingTextarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                handleSubmit();
              }
            }}
          />
          {/* <TextareaAutosize minRows={2} maxRows={7} className="w-full p-2 rounded-md resize-none border-grey border-solid border" value={value} onChange={(e) => setValue(e.target.value)} /> */}
          <Button size={'icon'}>
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={divRef}></div>
    </div>)
}