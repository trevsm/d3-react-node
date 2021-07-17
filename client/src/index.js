import React, { useEffect, useState } from "react"
import { render } from "react-dom"
import Plot from "./Plot"

export function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/api")
      .then((r) => r.json())
      .then((j) => setData(j))
  }, [setData])

  return (
    <div>
      <Plot data={data} width={700} height={700} />
    </div>
  )
}

render(<App />, document.querySelector("#root"))
