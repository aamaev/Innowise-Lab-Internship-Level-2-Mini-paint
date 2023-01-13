import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface Props {
    imageID: string
}

const FeedItem = ({ imageID }: Props) => {  
    const [imgURL, setImgURL] = useState('');
    
    const storage = getStorage();
    getDownloadURL(ref(storage, `/${imageID}`))
        .then((url) => {       
            setImgURL(url);
        })
        .catch((error) => {
            console.log(error);
        });
    
    return (
        <div className='flex justify-center' >
            <img className='border border-black rounded-xl' width={350} height={350} src={imgURL} alt=""/>
        </div>
    );
};

export default FeedItem;