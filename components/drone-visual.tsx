"use client"

import { useEffect, useRef } from "react"

export function DroneVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let rotation = 0

    const draw = () => {
      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(rotation)

      // Draw wireframe drone
      ctx.strokeStyle = "#c67878"
      ctx.lineWidth = 2

      // Body
      ctx.beginPath()
      ctx.arc(0, 0, 40, 0, Math.PI * 2)
      ctx.stroke()

      // Arms
      for (let i = 0; i < 4; i++) {
        ctx.save()
        ctx.rotate((Math.PI / 2) * i)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(80, 0)
        ctx.stroke()

        // Propellers
        ctx.beginPath()
        ctx.arc(80, 0, 15, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      ctx.restore()

      rotation += 0.005
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} width={300} height={300} className="opacity-30" />
}
