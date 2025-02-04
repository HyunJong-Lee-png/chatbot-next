'use server'

import db from "@/db";
import { verifySession } from "./sessions"
import { conversation, message } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { AUTH_ROUTES, BASE_URL } from "@/constant/route";

export const addMessages = async (
  conversationId: string,
  userContent: string,
  aiContent: string
) => {
  await db.insert(message).values({
    content: userContent,
    role: "user",
    conversationId,
  });
  await db.insert(message).values({
    content: aiContent,
    role: 'assistant',
    conversationId
  })
}

export const createConversation = async (name: string) => {
  const session = await verifySession();

  const result = await db.insert(conversation).values({
    name,
    userId: session.id
  }).returning();

  return result[0];
}

export const getConversations = async () => {
  const session = await verifySession();
  console.log('getConversation함수가 conversation파일에서 실행되는중')
  //로그인한 유저가 만든 대화테이블중 해당path에 맞는 대화테이블 가져오기
  const conversationResult = await db.select()
    .from(conversation)
    .where(
      eq(conversation.userId, session.id)
    ).orderBy(asc(conversation.createdAt));

  return conversationResult || [];
}

export const getMessages = async (conversationId: string) => {

  //메세지 가져오기
  const messageResult = await db.select()
    .from(message)
    .where(
      eq(message.conversationId, conversationId)
    )

  return messageResult || [];
}

export const updateConversation = async (conversationId: string, newName: string) => {

  await db.update(conversation)
    .set({
      name: newName,
      updatedAt: new Date(),
    })
    .where(eq(conversation.id, conversationId));
}

export const deleteConversation = async (conversationId: string) => {

  await db.delete(conversation).where(eq(conversation.id, conversationId));
  // revalidatePath('/awfjlwaf')
}