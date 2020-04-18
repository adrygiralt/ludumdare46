class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed
    this.moving = false
  }

  move(direction) {
      this.moving = direction !== -1
      if (direction === -1) return
      let angle = 0 + 45 * direction
      let angleInRad = angle*2*Math.PI/360
      let newx = this.x - this.speed * Math.cos(angleInRad) * (1/FPS)
      let newy = this.y - this.speed * Math.sin(angleInRad) * (1/FPS)

      //avoid going "de passeig"
      this.x = Math.min (Math.max(newx, 0), CANVAS_X)
      this.y = Math.min (Math.max(newy, 0), CANVAS_X)
  }
}
