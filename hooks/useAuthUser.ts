import { useEffect } from "react";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export const useAuthUser = () => {
  const { getState } = useAuthUserStore;
  const authUser = useAuthUserStore(state => state.authUser)
  const isLogin = useAuthUserStore(state => state.isLogin)
  const reducer = useAuthUserStore(state => state.reducer)

  useEffect(() => {    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;
          const authUser = {
            uid,
            email,
            displayName,
            photoURL
          };
          reducer(authUser)
        } else {
          reducer(null)
        }
      },
      () => {
        console.error("Failed to check user state")
      });
    return () => {
      unsubscribe();
    };
  }, [reducer]);

  return {authUser, isLogin};
};
