import React, { useEffect } from 'react';
import FeedItem from './FeedItem';
import { useState } from 'react';
import { fetchImages } from '../fetchData/FetchImages';
import uuid from 'react-uuid';
import { FeedGridProps } from '../interfaces/interfaces';
import { BiLoader } from 'react-icons/bi';

const FeedGrid = ({ filter }: FeedGridProps) => {
    const [images, setImage] = useState<any[]>();
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => { 
        setLoading(true);
        fetchImages()
            .then(res => {
                setLoading(false); 
                setImage(res);     
            })
            .catch(() => {
                setLoading(false);   
            });
    }, []);

    if (isLoading) {
        return <BiLoader size={50} className='m-auto max-w-xl'/>;
    }
    
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