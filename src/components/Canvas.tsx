import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks/redux';
import { startDrawingPencil, endDrawingPencil, drawPencil } from '../Tools/Pencil';
import { startDrawingSquare, drawSquare } from '../Tools/Square';
import { startDrawingCircle, drawCircle } from '../Tools/Circle';
import { startDrawingLine, drawLine } from '../Tools/Line';
import SaveImg from './SaveImg';


const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [image, setImage] = useState('');
    const { lineColor } = useAppSelector(state => state.pencilReducer);
    const { lineWidth } = useAppSelector(state => state.pencilReducer);
    const { type } = useAppSelector(state => state.pencilReducer);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        setImage(canvas.toDataURL('image/png'));
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
    }, [type, image, lineColor, lineWidth]);

    const saveChanges = () => {
        const canvas = canvasRef.current; 
        if (!canvas) {
            return;
        }
        setImage(canvas.toDataURL('image/png'));  
    }
    console.log(image);
    
    const startDrawing = (e: any): void => {
        switch(type){
            case 'PENCIL': 
                startDrawingPencil(e, ctxRef);
                break;
            case 'ERASURE': 
                startDrawingPencil(e, ctxRef);
                break;   
            case 'SQUARE': 
                startDrawingSquare(e, ctxRef, canvasRef);
                break;  
            case 'CIRCLE': 
                startDrawingCircle(e, ctxRef, canvasRef);
                break;  
            case 'LINE': 
                startDrawingLine(e, ctxRef, canvasRef);
                break;  
            default: return;
        }
        setIsDrawing(true);
    }

    const endDrawing = (): void => {
        switch(type){
            case 'PENCIL': 
                endDrawingPencil(ctxRef);
                setIsDrawing(false);
                break;
            case 'ERASURE': 
                endDrawingPencil(ctxRef);
                setIsDrawing(false);
                break;
            default: 
                setIsDrawing(false);
                break;
        }
        saveChanges();
    } 

    const draw = (e: any): void => {
        if (!isDrawing){
            return;
        }
        switch(type){
            case 'PENCIL': 
                drawPencil(e, ctxRef);
                break;
            case 'ERASURE': 
                drawPencil(e, ctxRef);
                break;
            case 'SQUARE': 
                drawSquare(e, ctxRef, lineColor, canvasRef);
                break;
            case 'CIRCLE': 
                drawCircle(e, ctxRef, lineColor, canvasRef);
                break;
            case 'LINE': 
                drawLine(e, ctxRef, lineColor, canvasRef);
                break;
            default: break;
        }
    }
    
    return (
        <>
            <div>
                <canvas className='border border-black' 
                        ref={canvasRef} 
                        width={500} 
                        height={500}
                        onMouseDown={startDrawing}
                        onMouseUp={endDrawing}
                        onMouseMove={draw} />
                <SaveImg img = { image }/>
            </div>
        </>
    );
};

export default Canvas;