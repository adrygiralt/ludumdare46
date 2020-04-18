class GameState {
  constructor() {
    this.frame = 0;
    this.viruses = []
    this.heartHp = HEART_INITIAL_HP
    this.defenders = {
      sniper: new Defender("SNIPER"),
      venom: new Defender("VENOM"),
      splash: new Defender("SPLASH"),
      std: new Defender("STD")
    }
    this.buffer = ""
  }

  reset() {
    gameState = {}
  }

  initPlayer(x, y, speed) {
    this.player = new Player(x, y, speed);
  }

  movePlayer(direction) {
    this.player.move(direction)
  }

  spawnVirus(type) {
    let x = VIRUS_SPAWN_LIMIT + Math.floor(Math.random() * (GAME_WIDTH - VIRUS_SPAWN_LIMIT * 2));
    let y = VIRUS_STARTLINE
    let v = new Virus(x, y, type)
    this.viruses.push(v)
  }

  moveViruses() {
    for (let v in this.viruses) {
      if (this.viruses[v].distanceToHeart() < HEART_HURT_DISTANCE) {
        this.heartHp -= this.viruses[v].damage;
        this.viruses.splice(v, 1);
      }
      else {
        this.viruses[v].move()
      }
    }
  }

  build() {
    for (let d in this.defenders) {
      if (distance(this.player, this.defenders[d]) <= PLAYER_INTERACTION && !this.defenders[d].built){
        this.defenders[d].built = true
        this.defenders[d].alive = FPS * DEFENDER_SECONDS_ALIVE
        this.defenders[d].level = 1
        this.defenders[d].letters = randomLetters(1)
        this.defenders[d].index = 0
        this.buffer = "" //just in case
      }
    }
  }

  defenderStep() {
    let playerNearDefender = false
    for (let d in this.defenders) {
      if (this.defenders[d].built) {
        this.defenders[d].alive--
      }
      if (this.defenders[d].alive === 0) {
        this.defenders[d].built = false
      }
      if (distance(this.defenders[d], this.player) <= PLAYER_INTERACTION && this.defenders[d].built) {
        playerNearDefender = true
        while (this.buffer.length > 0) {
          this.defenders[d].gotLetter(this.buffer[0])
          this.buffer = this.buffer.slice(1)
        }
      }
    }

    if (!playerNearDefender) {
      this.buffer = ""
    }
  }

  addToBuffer(c) {
    this.buffer += c
    console.log(this.buffer)
  }
}
