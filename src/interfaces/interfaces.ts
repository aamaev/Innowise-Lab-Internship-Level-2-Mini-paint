export interface PencilState {
    lineColor: string;
    lineWidth: number;
    type: string;
}

export interface UserState {
    uid: string | null,
    email: string | null
}

export interface IAuthContext {
    signIn: (auth: any, email: string, password: string) => void,
    signUp: (auth: any, email: string, password: string) => void,
    logOut: () => void
}


