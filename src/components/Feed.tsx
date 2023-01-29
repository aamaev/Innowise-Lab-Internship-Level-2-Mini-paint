import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onValue, ref as refDB } from 'firebase/database';
import { db } from '../firebase';
import { useAppSelector } from '../hooks/hooks';
import Header from './Header/Header';
import FeedGrid from './FeedGrid/FeedGrid';

const Feed = () => {
    const {email} = useAppSelector(state => state.user);
    const [usersEmails, setUserEmail] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>('');
    const navigate = useNavigate();

    const fetchAllUsers = () => {
        onValue(refDB(db, `users/`), (snapshot) => {
            const data = snapshot.val();
            if (data){
                const keys = Object.keys(data);
                const emails: string[] = keys.map((key) => {
                    return data[key].email
                })
                setUserEmail(emails);
            }
        });
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const userFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setFilter(value);
    }

    const navigateHandler = () => {
        navigate('/create');
    }

    return (
        <>
            <Header email = { email } /> 
            <div className='flex m-5 justify-center'>
                <select value = { filter }onChange={userFilter} className='flex items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300'>
                    <option disabled>CHOOSE FILTER</option>
                    <option value={''}>all</option>
                    {usersEmails &&
                        usersEmails.map((user: string) => (
                            <option key={ user } >{ user }</option>
                        ))
                    }
                </select>
                <div className='ml-3'>
                    <button className="rounded border border-green-200 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-green-400"
                            onClick={navigateHandler}> Create! </button>
                </div>
            </div>
            <FeedGrid filter = { filter } />  
        </>
    );
};

export default Feed;