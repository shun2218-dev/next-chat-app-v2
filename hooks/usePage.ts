import { NavigationState } from '@/types/NavigationState';
import { useRouter } from 'next/navigation';

export const usePage = () => {
  const router = useRouter();

  const toStart = () => {
    router.push('/');
  };

  const toLogin = () => {
    router.push('/login');
  };

  const toRegister = () => {
    router.push('/register');
  };

  const toReset = () => {
    router.push('/reset');
  };

  const toComplete = (state: NavigationState) => {
    router.push('/reset/complete'); //query: { ...state }
  };

  const toProfile = (uid: string, state?: NavigationState) => {
    if (state) {
      router.push(`/${uid}/profile`); //query: { ...state }
    } else {
      router.push(`/${uid}/profile`);
    }
  };

  const toUser = (uid: string, state?: NavigationState) => {
    if (state) {
      router.push(`/${uid}`); //query: { ...state }
    } else {
      router.push(`/${uid}`);
    }
  };

  const toHome = (uid: string, state?: NavigationState) => {
    if (state) {
      router.push(`/${uid}/home`); //query: { ...state }
    } else {
      router.push(`/${uid}/home`);
    }
  };

  const toPrivate = (uid: string) => {
    router.push(`/${uid}/private`);
  };

  const toPrivateRoom = (uid: string, partnerid: string) => {
    router.push(`/${uid}/private/${partnerid}`);
  };

  const toGroup = (uid: string) => {
    router.push(`/${uid}/group`);
  };

  const toGroupRoom = (uid: string, groupid: string, state?: NavigationState) => {
    router.push(`/${uid}/group/${groupid}`); // query: { ...state }
  };

  const toJoin = (uid: string) => {
    router.push(`/${uid}/group/join`);
  };

  const toCreate = (uid: string) => {
    router.push(`/${uid}/group/create`);
  };

  const toRedirect = (state: NavigationState) => {
    router.push('.'); // , query: { replace: true, ...state }
  };

  return {
    toStart,
    toLogin,
    toRegister,
    toReset,
    toComplete,
    toProfile,
    toUser,
    toHome,
    toPrivate,
    toPrivateRoom,
    toGroup,
    toGroupRoom,
    toJoin,
    toCreate,
    toRedirect,
  };
};
