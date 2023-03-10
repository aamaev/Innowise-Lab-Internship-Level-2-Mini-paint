import React, { useEffect } from 'react';
import { fetchImages } from '../../store/Redux-slices/imagesSlice';
import { BiLoader } from 'react-icons/bi';
import { useAppDispatch } from '../../hooks/hooks';
import { useAppSelector } from '../../hooks/hooks';
import { FeedGridProps } from './FeedGridInterfaces';
import FeedItem from '../FeedItem/FeedItem';
import uuid from 'react-uuid';

const FeedGrid = ({ filter }: FeedGridProps) => {
    const {images, loading} = useAppSelector(state => state.images);
    const dispatch = useAppDispatch();
    
    useEffect(() => { 
        dispatch(fetchImages());
    }, [dispatch]);
    
    return (
        loading ? 
            <BiLoader size={50} className='m-auto max-w-xl'/>
        :
            <div className='grid grid-cols-3 gap-3'>
                {images &&
                    (filter ?
                        images.map(item => (
                            filter === item.email &&
                            <FeedItem key={ uuid() } imageID={ item.imagesrc } />))
                        : 
                        images.map(item => (
                            <FeedItem key={ uuid() } imageID={ item.imagesrc } />))
                    )
                }     
            </div>
    );
};

export default FeedGrid;