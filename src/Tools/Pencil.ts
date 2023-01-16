export const startDrawingPencil = (e: MouseEvent, ctxRef: any) => {
    ctxRef.current!.beginPath();
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
} 

export const endDrawingPencil = (ctxRef: any) =>  {
    ctxRef.current!.closePath();
}

export const drawPencil = (e: MouseEvent, ctxRef: any) =>  {
    ctxRef.current!.lineTo(e.offsetX, e.offsetY);
    ctxRef.current!.stroke();
}





