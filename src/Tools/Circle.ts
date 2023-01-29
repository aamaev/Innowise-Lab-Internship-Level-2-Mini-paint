import { MutableRefObject } from "react";

const mouseState = {
    startX: 0,
    startY: 0,
    saved: ''
};

export const startDrawingCircle = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    ctxRef.current!.beginPath();
    mouseState.startX = e.pageX - canvasRef.current!.offsetLeft;
    mouseState.startY = e.pageY - canvasRef.current!.offsetTop;
    mouseState.saved = canvasRef.current!.toDataURL();
} 

export const drawCircle = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, lineColor: string, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    let currentX = e.pageX - canvasRef.current!.offsetLeft;
    let currentY = e.pageY - canvasRef.current!.offsetTop;
    let width =  currentX - mouseState.startX;
    let height =  currentY - mouseState.startY;
    let d = Math.sqrt((Math.pow(width,2) + Math.pow(height, 2)));
    const img = new Image();
    img.src = mouseState.saved;
    img.onload = () => {
        ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.drawImage(img, 0, 0,canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.beginPath();
        ctxRef.current!.arc(mouseState.startX, mouseState.startY, d/2, 0, 2 * Math.PI);;
        ctxRef.current!.fillStyle = lineColor;
        ctxRef.current!.fill();
        ctxRef.current!.stroke();
    } 
}
