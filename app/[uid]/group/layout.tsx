'use clidnt';
import { FC, ReactNode } from 'react';
import { AuthLayout } from '@/components/authLayout';

type Props = {
  children: ReactNode;
};

const GroupLayout: FC<Props> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default GroupLayout;
