import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Header from './Header/Header';

const CreateImg = () => {
    const {email} = useAppSelector(state => state.user);
    
    return (
        <div>
            <Header email={email} /> 
            <div className='flex'>
                <Toolbar />
                <Canvas />
            </div>
        </div>
    )
};

export default CreateImg;