class GameState {
  constructor() {
    this.reset(GAMESTATUS_START)
  }

  reset(status) {
    this.status = status
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
    this.projectiles = []
    this.starting = false
    this.setRound(0)
    this.initPlayer(PLAYER_START_X, PLAYER_START_Y, PLAYER_SPEED)
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
        this.heartHp = Math.max(0,this.heartHp - this.viruses[v].damage)
        if (this.heartHp === 0) {
          this.gameOver()
        }
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
      if (this.defenders[d].alive === 0 && this.defenders[d].built) {
        this.defenders[d].built = false
        this.defenders[d].level = Math.max(Math.floor(this.defenders[d].level / 2), 1)
      }
      if (distance(this.defenders[d], this.player) <= PLAYER_INTERACTION && this.defenders[d].built) {
        playerNearDefender = true
        while (this.buffer.length > 0) {
          this.defenders[d].gotLetter(this.buffer[0])
          this.buffer = this.buffer.slice(1)
        }
      }
      if (this.defenders[d].built && this.defenders[d].canShoot(this.frame) && this.viruses.length > 0) {
          this.createProjectile(this.defenders[d].x, this.defenders[d].y, this.defenders[d].type)
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

  nextFrame() {
    this.frame++
    this.timeLeft--
    if (this.timeLeft == 0 && this.status === GAMESTATUS_PLAY) {
      this.timeLeft = TIME_BETWEEN_ROUNDS * FPS
      this.round++
      this.spawnRound()
    }
  }

  createProjectile(x, y, type) {
    let p = new Projectile(x, y, type)
    this.projectiles.push(p)
  }

  moveProjectiles() {
    for (let p in this.projectiles){
      //look for nearest virus
      if (this.viruses.length == 0) this.projectiles.splice(p, 1)
      else {
        let nearestVirus = 0
        let distanceToNearestVirus = distance(this.viruses[0], this.projectiles[p])
        for (let v in this.viruses) {
          let d = distance(this.viruses[v], this.projectiles[p])
          if (d < distanceToNearestVirus) {
            distanceToNearestVirus = d
            nearestVirus = v
          }
        }
        if ((distanceToNearestVirus > PROJECTILE_INTERACTION_DISTANCE && this.projectiles[p].type !== "sniper")|| (this.projectiles[p].type === "sniper" && this.projectiles[p].counter > 0)) {
          this.projectiles[p].moveTo(this.viruses[nearestVirus].x, this.viruses[nearestVirus].y)
        }
        else {
          let dead = this.viruses[nearestVirus].doDamage(this.projectiles[p].damage)
          this.projectiles.splice(p, 1)
          if (dead) {
            this.viruses.splice(nearestVirus, 1)
          }
        }
      }
    }
  }

  spawnRound() {
    console.log("Spawning Round: " + this.round)
    let roundVirus = ROUNDS[this.round-1]
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < roundVirus[i]; j++) {
        this.spawnVirus(VIRUS_NAMES[i])
      }
    }
  }

  setRound(r) {
    this.round = r
    this.timeLeft = TIME_BETWEEN_ROUNDS * FPS
  }

  gameOver() {
    this.status = GAMESTATUS_OVER
    this.frame = 0
    this.restarting = false
    console.log("GAME OVER")
  }

  checkStart() {
    if(!this.starting){
      if (is_key_down(" ")) {
        this.starting = true
        this.frame = 100
      }
    }
    else {
      if (this.frame === 160) {
        this.reset(GAMESTATUS_PLAY)
      }
    }
  }

  checkMenu() {
    if (!this.restarting) {
      if (is_key_down(" ")) {
        this.restarting = true
        this.restartCounter = 0
      }
    }
    else {
      this.restartCounter++
      if(this.restartCounter >= 120) {
        this.reset(GAMESTATUS_START)
      }
    }
  }
}
