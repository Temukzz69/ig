"use client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
type User = {
  email: string;
  password: string;
  username: string;
  bio: string | null;
  pfp: string | null;
};
type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  login: (password: string, email: string) => Promise<void>;
};
export const AuthContext = createContext<AuthContext | null>(null);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  const login = async (password: string, email: string) => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const values = {
    user: user,
    setUser: setUser,
    login: login,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("ALDAA BN");
  }
  return authContext;
};
