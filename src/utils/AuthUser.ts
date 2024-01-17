import { useAuthUser } from 'react-auth-kit';
import { User } from './types';

function AuthUser() {
  const auth = useAuthUser();
  const user = auth();

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return user as User;
}

export default AuthUser;
