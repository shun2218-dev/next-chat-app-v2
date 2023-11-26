"use client";
import React, { ReactNode } from "react";
import {AuthLayout} from "@/components/authLayout";

// const existUser = async (uid: string) => {
//   const ids = await getUserIds();
//   const exist = ids.includes(uid);
//   return exist;
// };

export default function Authlayout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
