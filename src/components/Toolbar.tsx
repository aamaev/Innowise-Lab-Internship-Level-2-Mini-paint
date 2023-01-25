import React from 'react';
import { BsFillEraserFill, BsFillPencilFill, BsSquare, BsSlashLg, BsCircle, BsStar } from 'react-icons/bs';
import { useAppDispatch } from '../hooks/hooks';
import { setLineColor, setLineWidth, setType } from '../store/Redux-slices/pencilSlice';

const Toolbar = () => {
    const dispatch = useAppDispatch(); 

    const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLineColor(e.target.value));
    }

    const lineWidthHeadler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setLineWidth(Number(e.target.value))); 
    }

    const setPencil = () => {
        dispatch(setType('PENCIL')); 
    }

    const setErasure = () => {
        dispatch(setType('ERASURE')); 
    }

    const setSquare = () => {
        dispatch(setType('SQUARE'));
    }

    const setLine = () => {
        dispatch(setType('LINE'))
    }

    const setCircle = () => {
        dispatch(setType('CIRCLE')); 
    }

    const setStar = () => {
        dispatch(setType('STAR'));
    }

    return (
        <div className='border border-black flex flex-col mr-52'> 
            <button className='m-4 block'><BsFillPencilFill size={30} onClick={setPencil} /></button>    
            <button className='m-4 block'><BsFillEraserFill size={30} onClick={setErasure} /></button>  
            <button className='m-4 block'><BsSquare size={30} onClick={setSquare} /></button>  
            <button className='m-4 block'><BsSlashLg size={30} onClick={setLine} /></button>  
            <button className='m-4 block'><BsCircle size={30} onClick={setCircle} /></button>
            <button className='m-4 block'><BsStar size={30} onClick={setStar} /></button>
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