class Projectile {
  constructor(x, y, type, level) {
    this.x = x
    this.y = y
    this.type = type
    this.color = PROJECTILES[type].color
    this.damage = PROJECTILES[type].damage
    this.destinationX = x
    this.destinationY = y
    this.originX = x
    this.originY = y
    this.counter = 30
  }

  moveTo(x, y) {
  this.destinationX = x
  this.destinationY = y
    if (this.type === "sniper"){
      this.counter--
      console.log(this.counter)
    }
    else {
      let d = distance(this.x, this.y, x, y)

      this.x += PROJECTILE_SPEED / FPS * (x - this.x) / d
      this.y += PROJECTILE_SPEED / FPS * (y - this.y) / d
    }
  }

  setDestination(x,y) {
    this.destinationX = x
    this.destinationY = y
  }
}
