import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/hooks';
import { db } from '../../firebase';
import { ref, set } from 'firebase/database';
import { SaveImgProps } from './SaveImgInterfaces';
import uuid from 'react-uuid';

const SaveImg = ({ img }: SaveImgProps) => {
    const navigate = useNavigate(); 
    const {email} = useAppSelector(state => state.user);

    const uploadImg = () => {
        if (!img) {
            return;
        } 
        set(ref(db, `images/${uuid()}/`),{
            email,
            imagesrc: img    
        });
        navigate('/feed');
    }
    
    return (
        <div>
            <button className='rounded border border-green-500 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:bg-green-300' onClick={uploadImg}>Save</button>
        </div>
    );
};

export default SaveImg;