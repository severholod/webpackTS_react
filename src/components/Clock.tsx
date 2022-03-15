import React, {FC, useEffect, useRef, useCallback} from 'react';

const RADIUS = 200
const WIDTH = RADIUS * 2
const HEIGHT = RADIUS * 2
function canvasResize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.canvas.width = width * window.devicePixelRatio
    ctx.canvas.height = height * window.devicePixelRatio

    ctx.canvas.style.width = width + 'px'
    ctx.canvas.style.height = height + 'px'

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
}
export const Clock: FC = () => {
    const canvas = useRef<HTMLCanvasElement>()
    const ctx = useRef<CanvasRenderingContext2D>()

    const handDraw = useCallback((angle: number, length: number, width: number) => {
        ctx.current.beginPath()
        ctx.current.lineWidth = width
        ctx.current.lineCap = "round";
        ctx.current.moveTo(0,0)
        ctx.current.rotate(angle)
        ctx.current.lineTo(0, -length)
        ctx.current.stroke()
        ctx.current.rotate(-angle)
    }, [])

    const clockDraw = useCallback(() => {
        const date = new Date()
        const seconds = date.getSeconds() + date.getMilliseconds() / 1000
        const minutes = date.getMinutes() + seconds / 60
        const hour = date.getHours() + minutes / 60
        ctx.current.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)


        handDraw((hour % 12) * (Math.PI/6), RADIUS * 0.5, 15)
        handDraw(minutes * (Math.PI/30), RADIUS * 0.75, 10)
        handDraw(seconds * (Math.PI/30), RADIUS * 0.9, 6)
        window.requestAnimationFrame(clockDraw)
    }, [])
    useEffect(() => {
        ctx.current = canvas.current.getContext('2d')
        canvasResize(ctx.current, WIDTH, HEIGHT)
        ctx.current.translate(WIDTH / 2, HEIGHT / 2)
        window.requestAnimationFrame(clockDraw)
    }, [])
    return (
        <canvas ref={canvas} style={{border: '1px solid #333'}}/>
    );
};
