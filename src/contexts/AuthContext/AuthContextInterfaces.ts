import { ReactNode } from "react";
import { Auth } from "firebase/auth";

export interface IAuthContext {
    signIn: (auth: Auth, email: string, password: string) => void,
    signUp: (auth: Auth, email: string, password: string) => void,
    logOut: () => void
}

export interface AuthContextProviderProps {
    children: ReactNode;
}