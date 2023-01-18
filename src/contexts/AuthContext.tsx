import React, { useState, createContext, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import toast, {Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { ref, set } from 'firebase/database';
import { IAuthContext } from "../interfaces/interfaces";
import { useAppDispatch } from '../hooks/redux';
import { userSlice } from '../reducers/UserSlice';
import { AuthContextProviderProps } from "../interfaces/interfaces";


const authContextDefaults: IAuthContext = {
    signIn: (auth: object, email: string, password: string) => null,
    signUp: (auth: object, email: string, password: string) => null,
    logOut: () => null
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
    const { setUserEmail } = userSlice.actions;
    const dispatch = useAppDispatch(); 

    const navigate = useNavigate();
    const [initializing, setInitializing] = useState(true);
   
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged((user) => {
            if (user){
                dispatch(setUserEmail(user.email));  
            } else {
                dispatch(setUserEmail(null));   
            }
            if (initializing) {
                setInitializing(false)
            }
        });
        return subscriber; 
    }, [initializing, dispatch, setUserEmail]);

    if (initializing) {
        return null;
    }
    
    const signIn = async (auth: any, email: string, password: string) => {
        const passwordInput: any = document.querySelector('.password-input');
        const emailInput: any = document.querySelector('.email-input');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success(`${userCredential.user.email}, welcome!`);
            navigate('/feed');
        } catch {
            toast.error("Check your login and password");
            passwordInput!.style = 'border-color: red';
            emailInput!.style = 'border-color: red';
            navigate('/signin');
        }
    }
    
    const signUp = async (auth: any, email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            toast.success(`${userCredential.user.email}, welcome!`);
            set(ref(db, `users/${userCredential.user.uid}/`),{
                email: userCredential.user.email
            });
            navigate('/feed')
        } catch {
            toast.error("Retry, something wrong..")
            navigate('/signup'); 
        }
    }

    const logOut = () => {
        signOut(auth);
        navigate("/signin");
    };

    return (
        <AuthContext.Provider value={{signIn, signUp, logOut}} >
            <Toaster />
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;








