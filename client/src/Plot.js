import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

function Plot({ data, width, height }) {
  const cRef = useRef()

  const STROKE = 3

  useEffect(() => {
    const base = d3.select(cRef.current)
    const svg = base
      .append("svg")
      .attr("viewBox", [-600 / 2, -600 / 2, 600, 600])
      .style("cursor", "crosshair")

    svg
      .append("defs")
      .append("style")
      .text(`circle.highlighted { stroke: orangered; fill: orangered; }`)

    // x and y are scales that project the data space to the ‘unzoomed’ pixel referential
    const x = d3.scaleLinear([0, 1], [0, 100])
    const y = d3.scaleLinear([0, 1], [0, 100])

    const delaunay = d3.Delaunay.from(
      data,
      (d) => x(d[0]),
      (d) => y(d[1])
    )

    const g = svg.append("g")

    const points = g
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d[0]))
      .attr("cy", (d) => y(d[1]))

    let transform

    const zoom = d3.zoom().on("zoom", (e) => {
      g.attr("transform", (transform = e.transform))
      g.style("stroke-width", STROKE / Math.sqrt(transform.k))
      points.attr("r", STROKE / Math.sqrt(transform.k))
    })

    svg
      .call(zoom)
      .call(zoom.transform, d3.zoomIdentity)
      .on("pointermove", (event) => {
        const p = transform.invert(d3.pointer(event))
        const i = delaunay.find(...p)
        points.classed("highlighted", (_, j) => i === j)
        d3.select(points.nodes()[i]).raise()
      })
  }, [data])

  return <div ref={cRef}></div>
}

export default Plot
