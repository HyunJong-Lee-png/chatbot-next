import { useState } from "react";
import { ZodIssue, ZodObject, ZodRawShape } from "zod";

interface Issues {
  [key: string]: string
}

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  // const [errors, setErrors] = useState<ZodIssue[] | null>();
  const [errors, setErrors] = useState<Partial<T> | null>()

  const validateField = (name: string, value: string) => {
    const parseValue = schema.pick({ [name]: true }).safeParse({
      [name]: value,
    });
    console.log('parsealue:', parseValue)
    // if (!parseValue.success) {
    //   setErrors(parseValue.error.issues);
    //   return;
    // }
    if (!parseValue.success) {
      setErrors({
        ...errors,
        ...parseValue.error.flatten().fieldErrors
      });
      return;
    }
    setErrors({
      ...errors,
      [name]: undefined
    })
  };

  return { errors, validateField };
}