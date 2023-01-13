import React, { useEffect } from 'react';
import FeedItem from './FeedItem';
import { useState } from 'react';
import { fetchImages } from '../fetchData/FetchImages';
import uuid from 'react-uuid';

interface Props{
    filter: string,
}

const FeedGrid = ({ filter }: Props) => {
    const [images, setImage] = useState<any[]>();

    useEffect(() => { 
        let timer: any;
        fetchImages()
            .then(res => {
                timer = setTimeout(() => {
                    setImage(res);  
                }, 200);       
            })
            .catch(error => {
                console.log(error);
            })
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className='grid grid-cols-3 gap-3'>
        {images &&
            (filter ?
                images.filter(item => item.includes(filter)).map(filteredImage => ( 
                    <FeedItem key={ uuid() } imageID={ filteredImage } />))
                : 
                images.map(item => (
                    <FeedItem key={ uuid() } imageID={ item } />))
            )
        }
        </div>   
    );
};

export default FeedGrid;