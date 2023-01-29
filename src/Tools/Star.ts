import { MutableRefObject } from "react";

const mouseState = {
    startX: 0,
    startY: 0,
    saved: ''
};

export const startDrawingStar = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    ctxRef.current!.beginPath();
    mouseState.startX = e.pageX - canvasRef.current!.offsetLeft;
    mouseState.startY = e.pageY - canvasRef.current!.offsetTop;
    mouseState.saved = canvasRef.current!.toDataURL();
} 

const star = (ctx: CanvasRenderingContext2D | null, R: number, cX: number, cY: number, N: number) => {
    ctx!.beginPath();
    ctx!.moveTo(cX + R, cY);
    let theta, x, y;
    for (let i = 1; i <= N * 2; i++) {
        if (i % 2 === 0) {
            theta = i * (Math.PI ) / (N );
            x = cX + (R * Math.cos(theta));
            y = cY + (R * Math.sin(theta));
        } else {
            theta = i * (Math.PI ) / (N );
            x = cX + ((R/2) * Math.cos(theta));
            y = cY + ((R/2) * Math.sin(theta));
        }
        ctx!.lineTo(x, y);
    }
    ctx!.closePath();
    ctx!.stroke();
  }

export const drawStar = (e: MouseEvent, ctxRef: MutableRefObject<CanvasRenderingContext2D | null>, lineColor: string, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
    let currentX = e.pageX - canvasRef.current!.offsetLeft;
    let currentY = e.pageY - canvasRef.current!.offsetTop;
    let width =  currentX - mouseState.startX;
    const img = new Image();
    img.src = mouseState.saved;
    img.onload = () => {
        ctxRef.current!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.drawImage(img, 0, 0,canvasRef.current!.width, canvasRef.current!.height);
        ctxRef.current!.beginPath();
        star(ctxRef.current, width, currentX, currentY, 6);
        ctxRef.current!.fillStyle = lineColor;
        ctxRef.current!.fill();
        ctxRef.current!.stroke();
    }
}