import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppSelector } from '../hooks/hooks';
import {draw, startDrawing, endDrawing} from '../Tools/drawTools';
import SaveImg from './SaveImg/SaveImg';


const Canvas = () => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const {lineColor, lineWidth, type} = useAppSelector(state => state.pencil);

    const mouseDownHandler = useCallback((e: MouseEvent) => {
        console.log(e);
        startDrawing(e, type, ctxRef, canvasRef);
        setIsDrawing(true);
    }, [type]);

    const mouseMoveHandler = useCallback((e: MouseEvent) => {
        if (!isDrawing){
            return;
        }
        draw(e, type, ctxRef, canvasRef, lineColor);
    }, [type, isDrawing, lineColor]);

    const mouseUpHandler = useCallback(() => {
        endDrawing(type, ctxRef);
        setIsDrawing(false);
        saveChanges();
    }, [type]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        switch(type){
            case('ERASURE'):
                ctx.strokeStyle = '#FFFFFF';
                break;
            default:
                ctx.strokeStyle = lineColor;
                break;
        }
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;

        canvas.addEventListener(('mousedown'), mouseDownHandler);
        canvas.addEventListener(('mousemove'), mouseMoveHandler);
        canvas.addEventListener(('mouseup'), mouseUpHandler);
        
        return () => {
            canvas.removeEventListener('mousedown', mouseDownHandler);    
            canvas.removeEventListener('mousemove', mouseMoveHandler);  
            canvas.removeEventListener('mouseup', mouseUpHandler); 
        }
    }, [type, image, lineColor, lineWidth, mouseDownHandler, mouseMoveHandler, mouseUpHandler]);

    const saveChanges = () => {
        const canvas = canvasRef.current; 
        if (!canvas) {
            return;
        }
        setImage(canvas.toDataURL('image/png'));  
    }

    return (
        <>
            <div>
                <canvas className='border border-black' 
                        ref={canvasRef} 
                        width={500} 
                        height={500}
                />
                <SaveImg img = { image }/>
            </div>
        </>
    );
};

export default Canvas;