function rand() {
  return Math.floor(Math.random() * 100)
}

function randArray(size) {
  return Array(size)
    .fill()
    .map(() => [rand(), rand()])
}

module.exports = { randArray }
