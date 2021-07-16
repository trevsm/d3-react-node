import React, { useEffect, useRef } from "react"

function Plot({ data, width, height }) {
  const ref = useRef()

  useEffect(() => {
    var canvas = ref.current
    var canvasWidth = canvas.width
    var canvasHeight = canvas.height
    var ctx = canvas.getContext("2d")
    var cd = ctx.getImageData(0, 0, canvasWidth, canvasHeight)

    function drawPixel(x, y, color) {
      var index = (x + y * canvasWidth) * 4
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
      ref={ref}
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
