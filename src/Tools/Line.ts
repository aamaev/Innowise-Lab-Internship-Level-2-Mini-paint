import { MutableRefObject } from "react";

const mouseState = {
    startX: 0,
    startY: 0,
    saved: ''
};

export const startDrawingLine = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    ctxRef.current!.beginPath();
    mouseState.startX = e.pageX - canvasRef.current!.offsetLeft;
    mouseState.startY = e.pageY - canvasRef.current!.offsetTop;
    mouseState.saved = canvasRef.current!.toDataURL();
} 

export const drawLine = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, lineColor: string, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    let currentX = e.pageX - canvasRef.current!.offsetLeft;
    let currentY = e.pageY - canvasRef.current!.offsetTop;
    const img = new Image();
    img.src = mouseState.saved;
    img.onload = () => {
        ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.drawImage(img, 0, 0,canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.beginPath();
        ctxRef.current!.lineTo(mouseState.startX, mouseState.startY);
        ctxRef.current!.lineTo(currentX, currentY);
        ctxRef.current!.fillStyle = lineColor;
        ctxRef.current!.fill();
        ctxRef.current!.stroke();
    } 
}