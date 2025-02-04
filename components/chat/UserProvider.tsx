'use client'

import { verifySession } from "@/actions/sessions";
import { useUserStore } from "@/store/user"
import { ReactNode, useEffect } from "react";

export function UserProvider({ children }: { children: ReactNode }) {
  const updateUser = useUserStore(state => state.updateUser);

  useEffect(() => {
    (async function () {
      const user = await verifySession();

      if (user) {
        updateUser(user);
      }

    })()
  }, [])

  return <>{children}</>
}