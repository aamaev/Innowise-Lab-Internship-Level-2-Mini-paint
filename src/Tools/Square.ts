import { MutableRefObject } from "react";

const mouseState = {
    startX: 0,
    startY: 0,
    saved: ''
};

export const startDrawingSquare = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    ctxRef.current!.beginPath();
    mouseState.startX = e.pageX - canvasRef.current!.offsetLeft;
    mouseState.startY = e.pageY - canvasRef.current!.offsetTop;
    mouseState.saved = canvasRef.current!.toDataURL();
} 

export const drawSquare = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, lineColor: string, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    let currentX = e.pageX - canvasRef.current!.offsetLeft;
    let currentY = e.pageY - canvasRef.current!.offsetTop;
    let width =  currentX - mouseState.startX;
    let height =  currentY - mouseState.startY;
    const img = new Image();
    img.src = mouseState.saved;
    img.onload = () => {
        ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.drawImage(img, 0, 0,canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.beginPath();
        ctxRef.current!.rect(mouseState.startX, mouseState.startY, width, height);
        ctxRef.current!.fillStyle = lineColor;
        ctxRef.current!.fill();
        ctxRef.current!.stroke();
    }
}