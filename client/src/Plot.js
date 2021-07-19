import React, { useEffect, useRef } from "react"

function Plot({ data, width, height }) {
  const cRef = useRef()

  useEffect(() => {
    const canvas = cRef.current
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ctx = canvas.getContext("2d")
    const cd = ctx.getImageData(0, 0, canvasWidth, canvasHeight)

    function drawPixel(x, y, color) {
      const index = (x + y * canvasWidth) * 4
      const { r, g, b, a } = color

      cd.data[index + 0] = r
      cd.data[index + 1] = g
      cd.data[index + 2] = b
      cd.data[index + 3] = a
    }

    function updateCanvas() {
      ctx.putImageData(cd, 0, 0)
    }

    data.map((d) => {
      drawPixel(d[0], d[1], { r: 0, g: 0, b: 0, a: 255 })
    })

    updateCanvas()
  }, [data])

  return (
    <canvas
      ref={cRef}
      width={width}
      height={height}
      style={{
        height,
        width,
      }}
    ></canvas>
  )
}

export default Plot
