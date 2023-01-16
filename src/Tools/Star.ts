let mousePosition = {
    startX: 0,
    startY: 0
};

let saved = '';

export const startDrawingStar = (e: MouseEvent | any, ctxRef: any, canvasRef: any) => {
    ctxRef.current!.beginPath();
    mousePosition.startX = e.pageX - e.target.offsetLeft;
    mousePosition.startY = e.pageY - e.target.offsetTop;
    saved = canvasRef.current.toDataURL();
} 

const star = (ctx: any, R: number, cX: number, cY: number, N: number) => {
    ctx.beginPath();
    ctx.moveTo(cX + R, cY);
    let theta;
    let x;
    let y;
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
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

export const drawStar = (e: MouseEvent | any, ctxRef: any, lineColor: string, canvasRef: any) => {
    console.log(e);
    let currentX = e.pageX - e.target.offsetLeft;
    let currentY = e.pageY - e.target.offsetTop;
    let width =  currentX - mousePosition.startX;
    const img = new Image();
    img.src = saved;
    img.onload = () => {
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.drawImage(img, 0, 0,canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.beginPath();
        star(ctxRef.current, width, currentX, currentY, 6);
        ctxRef.current.fillStyle = lineColor;
        ctxRef.current.fill();
        ctxRef.current.stroke();
    }
}