import { User } from 'firebase/auth';
export type AuthUser = Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'>;
