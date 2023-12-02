'use client';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { usePage } from '@/hooks/usePage';
import { useAuthUserStore } from '@/atoms/useAuthUserStore';

type Props = {
  children: ReactNode;
};

const AuthLayoutMemo: FC<Props> = ({ children }) => {
  const { toLogin, toUser } = usePage();
  const authUser = useAuthUserStore((state) => state.authUser);
  const pathname = usePathname();
  const matcher = useMemo(() => {
    return pathname === '/login' || pathname === '/register' || pathname === '/reset';
  }, [pathname]);
  useEffect(() => {
    document.body.classList.remove('home');
    if (matcher) {
      if (authUser !== null) {
        toUser(authUser.uid);
      }
    } else {
      if (authUser === null) {
        toLogin();
      }
    }
  }, []);
  return <div className="auth-layout">{children}</div>;
};

const AuthLayout = memo(AuthLayoutMemo);
export { AuthLayout };
