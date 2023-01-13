import React from 'react';
import { BsFillEraserFill, BsFillPencilFill, BsSquare, BsSlashLg, BsCircle } from 'react-icons/bs';
import { useAppDispatch } from '../hooks/redux';
import { pencilSlice } from '../reducers/PencilSlice';

const Toolbar = () => {
    const { setLineColor } = pencilSlice.actions;
    const { setLineWidth } = pencilSlice.actions;
    const { setType } = pencilSlice.actions;
    const dispatch = useAppDispatch(); 
    return (
        <div className='border border-black flex flex-col mr-52'> 
            <button className='m-4 block'><BsFillPencilFill size={30} onClick={() => dispatch(setType('PENCIL'))} /></button>    
            <button className='m-4 block'><BsFillEraserFill size={30} onClick={() => dispatch(setType('ERASURE'))} /></button>  
            <button className='m-4 block'><BsSquare size={30} onClick={() => dispatch(setType('SQUARE'))} /></button>  
            <button className='m-4 block'><BsSlashLg size={30} onClick={() => dispatch(setType('LINE'))} /></button>  
            <button className='m-4 block'><BsCircle size={30} onClick={() => dispatch(setType('CIRCLE'))} /></button>
            <input type='color' 
                onChange={(e) => dispatch(setLineColor(e.target.value))}
                className='m-4 w-8 h-6'
            />  
            <input 
                onChange={(e) => dispatch(setLineWidth(Number(e.target.value)))}
                type="number" 
                className='m-4 border w-9 h-6' 
                min='1' 
                max='20' 
                required />
        </div>
    );
};

export default Toolbar;