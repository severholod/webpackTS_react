import React, {FC, useEffect, useRef, useCallback} from 'react';

const RADIUS = 200
const WIDTH = RADIUS * 2
const HEIGHT = RADIUS * 2

const HOUR_LENGTH = RADIUS * 0.5
const MINUTE_LENGTH = RADIUS * 0.75
const SECOND_LENGTH = RADIUS * 0.9

const getCoords = (startX: number, startY: number, length: number, angle: number) => {
    const x = startX + length * Math.cos(angle - Math.PI / 2);
    const y = startY + length * Math.sin(angle  - Math.PI / 2);
    return {x, y}
}

function canvasResize(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.canvas.width = width * window.devicePixelRatio
    ctx.canvas.height = height * window.devicePixelRatio

    ctx.canvas.style.width = width + 'px'
    ctx.canvas.style.height = height + 'px'

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
}
export const Clock: FC = () => {
    const canvas = useRef<HTMLCanvasElement>()
    const ctx = useRef<CanvasRenderingContext2D>()

    const handDraw = useCallback((startX: number, startY: number, endX: number, endY: number, width: number) => {
        ctx.current.beginPath()
        ctx.current.lineWidth = width
        ctx.current.lineCap = "round";
        ctx.current.moveTo(startX, startY)
        ctx.current.lineTo(endX, endY)
        ctx.current.stroke()
    }, [])

    const clockDraw = useCallback(() => {
        const date = new Date()
        const seconds = date.getSeconds() + date.getMilliseconds() / 1000
        const minutes = date.getMinutes() + seconds / 60
        const hour = date.getHours() + minutes / 60

        const hourAngle = (hour % 12) * (Math.PI/6)
        const minuteAngle = minutes * (Math.PI/30)
        const secondAngle = seconds * (Math.PI/30)

        const hourHand = getCoords(0, 0, HOUR_LENGTH, hourAngle)
        const minutesHand = getCoords(0, 0, MINUTE_LENGTH, minuteAngle)
        const secondHand = getCoords(0, 0, SECOND_LENGTH, secondAngle)

        const hourHandShadow1 = getCoords(secondHand.x, secondHand.y, HOUR_LENGTH, hourAngle)
        const hourHandShadow2 = getCoords(minutesHand.x, minutesHand.y, HOUR_LENGTH, hourAngle)

        const shs1 = getCoords(secondHand.x, secondHand.y, MINUTE_LENGTH, minuteAngle)
        const shs2 = getCoords(shs1.x, shs1.y, HOUR_LENGTH, hourAngle)

        ctx.current.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT)
        handDraw(secondHand.x, secondHand.y, hourHandShadow1.x, hourHandShadow1.y, 1)
        handDraw(hourHand.x, hourHand.y, hourHandShadow1.x, hourHandShadow1.y, 1)
        handDraw(minutesHand.x, minutesHand.y, hourHandShadow2.x, hourHandShadow2.y, 1)
        handDraw(hourHand.x, hourHand.y, hourHandShadow2.x, hourHandShadow2.y, 1)
        handDraw(minutesHand.x, minutesHand.y, shs1.x, shs1.y, 1)
        handDraw(secondHand.x, secondHand.y, shs1.x, shs1.y, 1)

        handDraw(shs1.x, shs1.y, shs2.x, shs2.y, 1)
        handDraw(hourHandShadow1.x, hourHandShadow1.y, shs2.x, shs2.y, 1)
        handDraw(hourHandShadow2.x, hourHandShadow2.y, shs2.x, shs2.y, 1)

        handDraw(0, 0, hourHand.x, hourHand.y,  15)
        handDraw(0, 0, minutesHand.x, minutesHand.y, 10)
        handDraw(0, 0, secondHand.x, secondHand.y, 5)

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
