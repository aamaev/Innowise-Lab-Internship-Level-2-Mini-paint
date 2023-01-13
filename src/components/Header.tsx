import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props{
    email: string | null,
}

const Header = ({email}: Props) => {
    const { logOut } = useContext(AuthContext);
    
    return (
        <div className="flex justify-between bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <Link to='/feed' className='text-xl font-bold ml-3 self-center text-white'> Mini-paint </Link>
            <div className='flex'>
                <div className='text-xl font-bold mr-3 self-center text-white'>
                {email}   
                </div>
                <div>
                    <button onClick={logOut} className="rounded border px-4 py-2 text-sm font-medium text-white hover:bg-gray-400"> Logout </button>
                </div>
            </div>
        </div>
    );
};

export default Header;