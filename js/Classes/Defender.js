class Defender {
  constructor(name) {
    this.x = DEFENDERS[name].x
    this.y = DEFENDERS[name].y
    this.color = DEFENDERS[name].color
    this.built = false
    this.id = DEFENDERS[name].id
  }

  gotLetter(c) {
    if (!this.built) return
    if (c === this.letters[this.index]) {
      this.index++
    }
    else {
      this.index = 0
    }
    if (this.index === this.letters.length) {
      this.levelUp()
      this.alive = Math.min(this.alive + DEFENDER_SECONDS_ALIVE * FPS, DEFENDER_MAX_SECONDS_ALIVE * FPS)
    }
  }

  levelUp() {
    this.level += 1
    this.index = 0
    this.letters = randomLetters (this.level)
  }
}
