export const startDrawingPencil = (e: any, ctxRef: any) => {
    ctxRef.current!.beginPath();
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
} 

export const endDrawingPencil = (ctxRef: any) =>  {
    ctxRef.current!.closePath();
}

export const drawPencil = (e: any, ctxRef: any) =>  {
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
    ctxRef.current!.stroke();
}





