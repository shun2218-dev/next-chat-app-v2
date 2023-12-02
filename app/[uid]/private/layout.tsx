'use client';
import { PageParam } from '@/types/PageParam';
import UserList from '@/components/userList';
import { AuthLayout } from '@/components/authLayout';

export default function PrivateLayout({ params, children }: { params: PageParam; children: React.ReactNode }) {
  return (
    <>
      <UserList params={params} />
      {children}
    </>
  );
}
