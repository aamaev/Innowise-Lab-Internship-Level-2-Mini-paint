let mousePosition = {
    startX: 0,
    startY: 0
};

let saved = '';

export const startDrawingSquare = (e: any, ctxRef: any, canvasRef: any) => {
    ctxRef.current!.beginPath();
    mousePosition.startX = e.pageX - e.target.offsetLeft;
    mousePosition.startY = e.pageY - e.target.offsetTop;
    saved = canvasRef.current.toDataURL();
} 

export const drawSquare = (e: any, ctxRef: any, lineColor: string, canvasRef: any) => {
    let currentX = e.pageX - e.target.offsetLeft;
    let currentY = e.pageY - e.target.offsetTop;
    let width =  currentX - mousePosition.startX;
    let height =  currentY - mousePosition.startY;
    const img = new Image();
    img.src = saved;
    img.onload = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.drawImage(img, 0, 0,canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.beginPath();
        ctxRef.current.rect(mousePosition.startX, mousePosition.startY, width, height);
        ctxRef.current.fillStyle = lineColor;
        ctxRef.current.fill();
        ctxRef.current.stroke();
    }
}