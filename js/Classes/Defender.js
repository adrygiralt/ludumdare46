class Defender {
  constructor(name) {
    this.x = DEFENDERS[name].x
    this.y = DEFENDERS[name].y
    this.color = DEFENDERS[name].color
    this.built = false
    this.id = DEFENDERS[name].id
  }

  gotLetter(c) {
    if (c === this.letters[this.index]) {
      this.index++
    }
    else {
      this.index = 0
    }
    if (index === this.letters.length) {
      levelUp()
    }
  }

  levelUp() {
    this.level += 1
    this.index = 0
    this.letters = randomLetters (this.level)
  }
}
