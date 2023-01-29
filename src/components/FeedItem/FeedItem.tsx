import React from 'react';
import { FeedItemProps } from './FeedItemInterfaces';

const FeedItem = ({ imageID }: FeedItemProps) => {  
    return (
        <div className='flex justify-center' >
            <img className='border border-black rounded-xl' width={350} height={350} src={imageID} alt=""/>
        </div>
    );
};

export default FeedItem;