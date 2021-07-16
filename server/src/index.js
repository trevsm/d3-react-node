const express = require("express")
const path = require("path")
const cors = require("cors")
const PORT = 4000

const app = express()

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: "200",
  })
)
app.use(express.static(path.resolve(__dirname, "../../client/build")))

function rand() {
  return Math.floor(Math.random() * 680)
}

const data = Array(100000)
  .fill()
  .map(() => [rand(), rand()])

app.get("/api", (req, res) => {
  res.json(data)
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
