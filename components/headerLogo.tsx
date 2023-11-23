import React, { memo } from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import styles from "@/styles/components/Header.module.scss";
import { useAuthUserStore } from "@/atoms/useAuthUserStore";
import Link from "next/link";

const HeaderLogoImage = memo(function HeaderLogoImageMemo() {
  return (
    <Image
      src={logo}
      alt="logo"
      width={200}
      height={67}
      className={styles.logo}
      priority
    />
  );
});

const HeaderLogo = memo(function HeaderLogoMemo() {
  const authUser = useAuthUserStore((state) => state.authUser);
  if (authUser?.uid) {
    return (
      <Link href={`/${authUser.uid}/home`}>
        <HeaderLogoImage />
      </Link>
    );
  } else {
    return (
      <Link href={`/start`}>
        <HeaderLogoImage />
      </Link>
    );
  }
});

export default HeaderLogo;
