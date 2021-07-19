const express = require("express")
const path = require("path")
const cors = require("cors")
const { randArray } = require("./tools/rand")

const PORT = 4000

const app = express()

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: "200",
  })
)
app.use(express.static(path.resolve(__dirname, "../../client/build")))

app.get("/api", (req, res) => {
  const data = randArray(5000)
  res.json(data)
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
