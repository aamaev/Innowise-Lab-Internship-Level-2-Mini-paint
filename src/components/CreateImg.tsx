import React from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import { useAppSelector } from '../hooks/hooks';
import Header from './Header';

const CreateImg = () => {
    const {email} = useAppSelector(state => state.user);
    
    return (
        <div>
            <Header email={ email } /> 
            <div className='flex'>
                <Toolbar />
                <Canvas />
            </div>
        </div>
    )
};

export default CreateImg;