import React from 'react';
import { setLineColor, setLineWidth, setType } from '../store/Redux-slices/pencilSlice';
import { useAppDispatch } from '../hooks/hooks';
import { ToolBarButtons } from '../configs/ToolbarButtons.config';
import uuid from 'react-uuid';

const Toolbar = () => {
    const dispatch = useAppDispatch(); 

    const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLineColor(e.target.value));
    }

    const lineWidthHeadler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLineWidth(Number(e.target.value))); 
    }

    const dispatchHandler = (type: string) => {
        dispatch(setType(type)); 
    }

    return (
        <div className='border border-black flex flex-col mr-52'> 
            {ToolBarButtons.map(btn => {
                return <button key={uuid()} className='m-4 block' onClick={() => dispatchHandler(btn.handler)}><btn.icon size={30} /></button>  
            })}
            <input type='color' 
                onChange={colorHandler}
                className='m-4 w-8 h-6'
            />  
            <input 
                onChange={lineWidthHeadler}
                type="number" 
                className='m-4 border w-9 h-6' 
                min='1' 
                max='20' 
                required 
            />
        </div>
    );
};

export default Toolbar;