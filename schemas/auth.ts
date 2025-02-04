import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요.' })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, { message: '이름은 문자만 입력할 수 있습니다.' }),

  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: "최소 8자이상을 입력해주세요." })
    .regex(/[A-Z]/, { message: '패스워드는 최소 1개이상의 대문자를 포함합니다.' })
    .regex(/[a-z]/, { message: '패스워드는 최소 1개이상의 소문자를 포함합니다.' })
    .regex(/[0-9]/, { message: '패스워드는 최소 1개이상의 숫자를 포함합니다.' })
    .regex(/[\W_]/, { message: '패스워드는 최소 1개이상의 특수문자를 포함합니다.' })

});

export const LoginSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  password: z.string().min(1, { message: '패스워드를 입력하세요' })
})