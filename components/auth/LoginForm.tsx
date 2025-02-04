'use client'
import { ChangeEvent, useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { LoginSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";
import toast from "react-hot-toast";
import { login } from "@/actions/login";

export default function LoginForm() {
  const [error, action] = useActionState(login, undefined)
  const { errors, validateField } = useFormValidate<TLoginFormError>(LoginSchema);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  }

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error])

  return <FormCard
    title='로그인'
    footer={{ label: "아직 계정이 없으신가요?", href: '/signup' }}
  >
    <form action={action} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          placeholder="example@example.com"
          type="email" onChange={handleChange}
          error={!!errors?.email}

        />
        {errors?.email && <FormMessage message={errors.email[0]} />}

      </div>
      <div className="space-y-1">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          placeholder="***********"
          type="password" onChange={handleChange}
          error={!!errors?.password}
        />
        {errors?.password && <FormMessage message={errors.password[0]} />}

      </div>
      <Submit className="w-full">로그인</Submit>
    </form>
  </FormCard>
}