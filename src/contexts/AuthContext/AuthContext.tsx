import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { ref, set } from 'firebase/database';
import { Auth } from "firebase/auth";
import { useAppDispatch } from '../../hooks/hooks';
import { setUserEmail } from "../../store/Redux-slices/userSlice";
import { IAuthContext, AuthContextProviderProps } from "./AuthContextInterfaces";
import toast, {Toaster} from 'react-hot-toast';


const authContextDefaults: IAuthContext = {
    signIn: (auth: Auth, email: string, password: string) => null,
    signUp: (auth: Auth, email: string, password: string) => null,
    logOut: () => null
};

export const AuthContext = createContext<IAuthContext>(authContextDefaults);

const AuthContextProvider = ({children}: AuthContextProviderProps) => {
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
    }, [initializing, dispatch]);

    if (initializing) {
        return null;
    }
    
    const signIn = async (auth: Auth, email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success(`${userCredential.user.email}, welcome!`);
            navigate('/feed');
        } catch {
            toast.error("Check your login and password");
            navigate('/signin');
        }
    }
    
    const signUp = async (auth: Auth, email: string, password: string) => {
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








