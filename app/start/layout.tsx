'use client';
import type { FC, ReactNode } from 'react';
import { useEffect, useCallback } from 'react';

type Props = {
  children: ReactNode;
};

const StartLayout: FC<Props> = ({ children }) => {
  const addHomeClass = useCallback(() => {
    const bodyClasses = document.body.classList;
    if (!bodyClasses.contains('home')) {
      bodyClasses.add('home');
    }
  }, []);

  useEffect(() => {
    addHomeClass();
  }, []);
  return <>{children}</>;
};

export default StartLayout;
