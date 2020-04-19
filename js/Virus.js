class Virus {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    this.speed = VIRUS[type].speed
    this.damage = VIRUS[type].damage
    this.hp = VIRUS[type].hp
    this.maxHp = VIRUS[type].hp
    this.id = VIRUS[type].id
  }

  move() {
    //if we're far from the heart, just go down
    if (this.y <= VIRUS_HORIZONTAL_LIMIT) {
      this.y += this.speed * (1/FPS)
    }
    //if we're near, infect it
    else {
      let xDiff = HEART_X - this.x
      let yDiff = HEART_Y - this.y
      let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff)
      this.x += this.speed * xDiff / distance * (1/FPS)
      this.y += this.speed * yDiff / distance * (1/FPS)
    }
  }

  distanceToHeart() {
      let xDiff = HEART_X - this.x
      let yDiff = HEART_Y - this.y
      let distance = Math.sqrt(xDiff*xDiff + yDiff*yDiff)

      return distance
  }

  doDamage(dmg) {
    this.hp = Math.max(0, this.hp - dmg)
    return this.hp === 0
  }
}
