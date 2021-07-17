function rand() {
  return Math.floor(Math.random() * 680)
}

function randArray(size) {
  return Array(size)
    .fill()
    .map(() => [rand(), rand()])
}

module.exports = { randArray }
