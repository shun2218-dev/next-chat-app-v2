'use clidnt';
import { FC, ReactNode } from 'react';
import { AuthLayout } from '@/components/authLayout';

type Props = {
  children: ReactNode;
};

const GroupLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default GroupLayout;
