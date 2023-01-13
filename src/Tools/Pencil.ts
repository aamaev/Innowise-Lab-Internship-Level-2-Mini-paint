let mousePosition = {
    startX: 0,
    startY: 0
};

export const startDrawingPencil = (e: any, ctxRef: any) => {
    ctxRef.current.beginPath();
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    mousePosition.startX = e.pageX - e.target.offsetLeft;
    mousePosition.startY = e.pageY - e.target.offsetTop;
} 

export const endDrawingPencil = (ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>) =>  {
    ctxRef.current!.closePath();
}

export const drawPencil = (e: any, ctxRef: any) =>  {
    let currentX = e.pageX - e.target.offsetLeft;
    let currentY = e.pageY - e.target.offsetTop;
    let width =  currentX - mousePosition.startX;
    let height =  currentY - mousePosition.startY;
    console.log(width, height);
    ctxRef.current!.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current!.stroke();
    // if (currentX < 0  || currentY < 0){
    //     ctxRef.current!.closePath();
    // } 
}





