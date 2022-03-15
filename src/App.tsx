import React, {FC, useEffect, useRef} from "react";

function canvasResize(ctx: any, width: number, height: number): void {
    ctx.canvas.width = width * window.devicePixelRatio
    ctx.canvas.height = height * window.devicePixelRatio

    ctx.canvas.style.width = width + 'px'
    ctx.canvas.style.height = height + 'px'

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
}
export const App: FC = () => {
    const canvasRef = useRef(null)

    const lineLayout = (ctx: any, angle: number, length: number, width: number) => {
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.lineCap = "round";
        ctx.moveTo(0,0)
        ctx.rotate(angle)
        ctx.lineTo(0, -length)
        ctx.stroke()
        ctx.rotate(-angle)


    }
    const clockLayout = (ctx: any, radius: number) => {
        const date = new Date()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        canvasResize(ctx, radius * 2, radius * 2)
        ctx.beginPath()
        ctx.arc(radius, radius, radius, 0 , 2*Math.PI)
        ctx.fillStyle = "#fff"
        ctx.fill()
        ctx.beginPath()
        ctx.arc(radius, radius, 10, 0 , 2*Math.PI)
        ctx.fillStyle = "#333"
        ctx.fill()

        ctx.translate(radius, radius)

        lineLayout(ctx, (hour % 12) * (Math.PI/6), radius * 0.5, 15)
        lineLayout(ctx, minutes * (Math.PI/30), radius * 0.75, 10)
        lineLayout(ctx, seconds * (Math.PI/30), radius * 0.9, 6)

    }
    useEffect(() => {
        // @ts-ignore
        const ctx = canvasRef.current.getContext('2d')
        setInterval(() => clockLayout(ctx, 200), 1000)
    }, [])
    return (
        <div><h1>Clock</h1>
        <canvas ref={canvasRef} style={{backgroundColor: '#333'}}/>
        </div>
    );
};