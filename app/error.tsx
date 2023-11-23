"use client"; // Error components must be Client components

import { AuthUserState, useAuthUserStore } from "@/atoms/useAuthUserStore";
import { usePage } from "@/hooks/usePage";
import { useCallback, useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  const { toStart, toHome } = usePage();
  const state = useAuthUserStore((state) => state);
  const onClick = useCallback((state: AuthUserState) => {
    const { authUser } = state;
    if (authUser === null) {
      toStart();
    } else {
      toHome(authUser.uid);
    }
  }, [toHome, toStart]);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h2>Something Error!</h2>
      <button onClick={() => onClick(state)}>Back to Top</button>
    </div>
  );
}
