import { User } from "firebase/auth";
import { createContext } from "react";

interface DbUser {
  id: number;
  name: string;
  email: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
