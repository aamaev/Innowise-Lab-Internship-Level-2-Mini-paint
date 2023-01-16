import React from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import { useAppSelector } from '../hooks/redux';

interface SaveImgProps { 
    img: string;
}

const SaveImg = ({ img }: SaveImgProps) => {
    const navigate = useNavigate(); 
    const { email } = useAppSelector(state => state.userReducer);

    const dataURLtoBlob = (dataurl: string | any) => {
        let arr = dataurl.split(','), 
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type:mime });
    }

    const uploadImg = () => {
        if (!img) {
            return;
        } 
        const metadata = {
            contentType: 'image/png',
        };
        const storageRef = ref(storage, `files/${email}/${uuid()}.png`);
        uploadBytes(storageRef, dataURLtoBlob(img), metadata).then((snapshot) => { 
            console.log('done');     
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