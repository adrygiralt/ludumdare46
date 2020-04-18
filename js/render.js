const playerImg = new Image()
playerImg.src = "assets/img/player.png"
const virusImg = new Image()
virusImg.src = "assets/img/virus1.png"
const heartImg = new Image()
heartImg.src = "assets/img/heart.png"
const uiImg = new Image()
uiImg.src = "assets/img/ui.png"
const backgroundImg = new Image()
backgroundImg.src = "assets/img/background2.png"
const defendersImg = new Image()
defendersImg.src = "assets/img/defenders.png"

function hpBar(x, y, width, height, hp, maxHP, ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, (hp / maxHP) * width, height);
}

function aliveBar(x, y, width, height, aliveCounter, ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, Math.min((aliveCounter / (DEFENDER_MAX_SECONDS_ALIVE * FPS / 3)),1) * width, height)
  ctx.fillStyle = "yellow";
  ctx.fillRect(x, y, Math.max(0,Math.min(((aliveCounter - (DEFENDER_SECONDS_ALIVE * FPS)) / (DEFENDER_MAX_SECONDS_ALIVE * FPS / 3)),1)) * width, height)
  ctx.fillStyle = "green";
  ctx.fillRect(x, y, Math.max(0,Math.min(((aliveCounter - (DEFENDER_SECONDS_ALIVE * FPS * 2)) / (DEFENDER_MAX_SECONDS_ALIVE * FPS / 3)),1)) * width, height)
}

function canvasPosition(ox, oy, width, height) {
  let x = ox - width / 2
  let y = oy - height / 2
  return [x, y]
}

function renderDefender(defender, player, frame, ctx) {
  let x = defender.x - DEFENDER_SIZE / 2
  let y = defender.y - DEFENDER_SIZE / 2
  let imgFrame = Math.floor((frame % 60) / 30) % 2
  if (!defender.built){
    if (imgFrame == 0 || true) {
      ctx.fillStyle = defender.color
      ctx.fillRect(x, y, 20, 5)
      ctx.fillRect(x+40, y, 20, 5)
      ctx.fillRect(x+80, y, 20, 5)

      ctx.fillRect(x, y+95, 20, 5)
      ctx.fillRect(x+40, y+95, 20, 5)
      ctx.fillRect(x+80, y+95, 20, 5)

      ctx.fillRect(x, y+20, 5, 20)
      ctx.fillRect(x, y+60, 5, 20)
      ctx.fillRect(x+95, y+20, 5, 20)
      ctx.fillRect(x+95, y+60, 5, 20)
    }
    /*else {
        ctx.fillStyle = defender.color
        ctx.fillRect(x+20, y, 20, 5)
        ctx.fillRect(x+60, y, 20, 5)

        ctx.fillRect(x+20, y+95, 20, 5)
        ctx.fillRect(x+60, y+95, 20, 5)

        ctx.fillRect(x, y, 5, 20)
        ctx.fillRect(x, y+40, 5, 20)
        ctx.fillRect(x, y+80, 5, 20)
        ctx.fillRect(x+95, y, 5, 20)
        ctx.fillRect(x+95, y+40, 5, 20)
        ctx.fillRect(x+95, y+80, 5, 20)
    }*/
    //defender mid position

    //render option if near
    if (distance(defender.x, defender.y, player.x, player.y) <= PLAYER_INTERACTION){
      ctx.fillStyle = "white"
      ctx.fillRect(x, y - 50, DEFENDER_SIZE, 40)
    }
  }
  else {
      ctx.drawImage(defendersImg, 32 * defender.id, 0, 32, 32, x, y, 100, 100)

      aliveBar(x, y + DEFENDER_SIZE + 5, DEFENDER_SIZE, 5, defender.alive, ctx)

      if (distance(defender.x, defender.y, player.x, player.y) <= PLAYER_INTERACTION){
        ctx.fillStyle = "white"
        ctx.fillRect(x, y - 50, DEFENDER_SIZE, 40)

        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.fillText(defender.letters.slice(defender.index,defender.index+5).toUpperCase(), x + DEFENDER_SIZE / 2 , y - 20);
      }
  }
}

function renderDefenders(defenders, player, frame, ctx) {
  renderDefender(defenders.sniper, player, frame, ctx)
  renderDefender(defenders.venom, player, frame, ctx)
  renderDefender(defenders.std, player, frame, ctx)
  renderDefender(defenders.splash, player, frame, ctx)
}

function renderPlayer(player, frame, ctx){
  //console.log(player.x, player.y)
  ctx.fillStyle = "red";
  let p = canvasPosition(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE)
  let x = p[0]
  let y = p[1]

  //static
  let imgFrame = Math.floor((frame % 30) / 15) % 2
  if (!player.moving) {
    ctx.drawImage(playerImg, PLAYER_SIZE * imgFrame, 0, PLAYER_SIZE, PLAYER_SIZE, x, y, PLAYER_SIZE, PLAYER_SIZE)
  }
  else {
    ctx.drawImage(playerImg, PLAYER_SIZE * (imgFrame+2), 0, PLAYER_SIZE, PLAYER_SIZE, x, y, PLAYER_SIZE, PLAYER_SIZE)
  }
}

function renderViruses(viruses, frame, ctx) {
  let imgFrame = Math.floor((frame % 30) / 15) % 2

  for (let v in viruses) {
    let p = canvasPosition(viruses[v].x, viruses[v].y, VIRUS_SIZE, VIRUS_SIZE)
    let x = p[0]
    let y = p[1]
    ctx.drawImage(virusImg, 50 * imgFrame, 0, VIRUS_SIZE, VIRUS_SIZE, x, y, VIRUS_SIZE, VIRUS_SIZE)
  }

}

function renderHeart(heartHp, frame, ctx) {
    let imgFrame = Math.floor((frame % 30) / 15) % 2

    let p = canvasPosition(HEART_X, HEART_Y, HEART_SIZE, HEART_SIZE)
    let x = p[0]
    let y = p[1]

    ctx.drawImage(heartImg, 32 * imgFrame, 0, 32, 32, x, y, HEART_SIZE, HEART_SIZE)

    hpBar(x, y + HEART_SIZE, HEART_SIZE, 10, heartHp, HEART_INITIAL_HP, ctx)
}

function renderUi() {
  ctx.drawImage(uiImg, 700, 0)

  ctx.drawImage(defendersImg, 0, 0, 32, 32, 800, 500, 100, 100)
  ctx.drawImage(defendersImg, 32, 0, 32, 32, 800, 600, 100, 100)
  ctx.drawImage(defendersImg, 64, 0, 32, 32, 800, 700, 100, 100)
  ctx.drawImage(defendersImg, 96, 0, 32, 32, 800, 800, 100, 100)
}

function renderBackground() {
  ctx.drawImage(backgroundImg, 0, 0)
}

function render (gameState, c, ctx) {
  let frame = gameState.frame
  ctx.clearRect(0, 0, c.width, c.height)

  renderBackground()

  renderUi()

  renderHeart(gameState.heartHp, frame, ctx)

  renderDefenders(gameState.defenders, gameState.player, frame, ctx)

  renderPlayer(gameState.player, frame, ctx)

  renderViruses(gameState.viruses, frame, ctx)



}
