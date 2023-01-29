import { MutableRefObject } from "react";

export const startDrawingPencil = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>) => {
    ctxRef.current!.beginPath();
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
} 

export const endDrawingPencil = (ctxRef: MutableRefObject<CanvasRenderingContext2D | null>) =>  {
    ctxRef.current!.closePath();
}

export const drawPencil = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>) =>  {
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
    ctxRef.current!.stroke();
}





