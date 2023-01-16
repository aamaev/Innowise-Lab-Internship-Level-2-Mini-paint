import { startDrawingPencil, endDrawingPencil, drawPencil } from '../Tools/Pencil';
import { startDrawingSquare, drawSquare } from '../Tools/Square';
import { startDrawingCircle, drawCircle } from '../Tools/Circle';
import { startDrawingLine, drawLine } from '../Tools/Line';
import { startDrawingStar, drawStar } from '../Tools/Star';

export const draw = (e: MouseEvent, type: string, ctxRef: any, canvasRef: any, lineColor: string): void => {
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
        case 'STAR': 
            drawStar(e, ctxRef, lineColor, canvasRef);
            break;    
        default: break;
    }
}

export const startDrawing = (e: MouseEvent, type: string, ctxRef: any, canvasRef: any): void => {
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
        case 'STAR': 
            startDrawingStar(e, ctxRef, canvasRef);
            break;      
        default: return;
    }
}

export const endDrawing = (type: string, ctxRef: any): void => {
    switch(type){
        case 'PENCIL': 
            endDrawingPencil(ctxRef);
            break;
        case 'ERASURE': 
            endDrawingPencil(ctxRef);
            break;
        default: 
            break;
    }
} 
