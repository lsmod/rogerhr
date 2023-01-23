import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { login as signin, User } from "../../store/login/loginSlice";

interface AuthData {
  hasSignin: boolean;
  isLoading: boolean;
  user: User | null;
  error: boolean;
  login: (email: string, password: string) => void;
}

function useAuth(): AuthData {
  const hasSignin = useSelector((state: RootState) => state.auth.hasSignin);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const dispatch = useDispatch<AppDispatch>();

  const login = (email: string, password: string) => {
    dispatch(signin({ email, password }));
  };

  return { hasSignin, isLoading, error, user, login };
}

export default useAuth;
