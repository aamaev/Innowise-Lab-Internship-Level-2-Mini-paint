export const startDrawingPencil = (e: any, ctxRef: any) => {
    ctxRef.current.beginPath();
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
} 

export const endDrawingPencil = (ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>) =>  {
    ctxRef.current!.closePath();
}

export const drawPencil = (e: any, ctxRef: any) =>  {
    ctxRef.current!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current!.stroke();
}





