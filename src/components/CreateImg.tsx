import React from 'react';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import { useAppSelector } from '../hooks/redux';
import Header from './Header';

const CreateImg: React.FC  = () => {
    const { email } = useAppSelector(state => state.userReducer);
    
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