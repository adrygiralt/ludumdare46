const playerImg = new Image()
playerImg.src = "assets/img/player.png"
const virusImg = new Image()
virusImg.src = "assets/img/virus.png"
const heartImg = new Image()
heartImg.src = "assets/img/heart.png"
const heartDeadImg = new Image()
heartDeadImg.src = "assets/img/heartDead.png"
const uiImg = new Image()
uiImg.src = "assets/img/ui2.png"
const backgroundImg = new Image()
backgroundImg.src = "assets/img/background2.png"
const defendersImg = new Image()
defendersImg.src = "assets/img/defenders.png"
const startBackgroundImage = new Image()
startBackgroundImage.src = "assets/img/startbg.png"
const title1Img = new Image()
title1Img.src = "assets/img/title1.png"
const title2Img = new Image()
title2Img.src = "assets/img/title2.png"

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
      //ctx.fillStyle = "white"
      //ctx.fillRect(x, y - 50, DEFENDER_SIZE, 40)
      ctx.font = '20px "Press Start 2P"';
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Space to build", x + DEFENDER_SIZE / 2 , y - 15);
    }
  }
  else {
      ctx.drawImage(defendersImg, 32 * defender.id, 0, 32, 32, x, y, 100, 100)

      aliveBar(x, y + DEFENDER_SIZE + 5, DEFENDER_SIZE, 5, defender.alive, ctx)

      if (distance(defender.x, defender.y, player.x, player.y) <= PLAYER_INTERACTION){
        //ctx.fillStyle = "white"
        //ctx.fillRect(x, y - 50, DEFENDER_SIZE, 40)

        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(defender.letters.slice(defender.index,defender.index+5).toUpperCase(), x + DEFENDER_SIZE / 2 , y - 15);
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
  let p = canvasPosition(player.x, player.y, PLAYER_SIZE / 2, PLAYER_SIZE)
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
    ctx.drawImage(virusImg, imgFrame * 16, viruses[v].id * 16, 16, 16, x, y, VIRUS_SIZE, VIRUS_SIZE)

    hpBar(x, y - 10, VIRUS_SIZE, 5, viruses[v].hp, viruses[v].maxHp, ctx)
  }

}

function renderHeart(heartHp, frame, ctx) {
    let imgFrame = Math.floor((frame % 30) / 15) % 2

    let p = canvasPosition(HEART_X, HEART_Y, HEART_SIZE, HEART_SIZE)
    let x = p[0]
    let y = p[1]

    if (heartHp > 0) {
      ctx.drawImage(heartImg, 32 * imgFrame, 0, 32, 32, x, y, HEART_SIZE, HEART_SIZE)

      hpBar(x, y + HEART_SIZE, HEART_SIZE, 10, heartHp, HEART_INITIAL_HP, ctx)
    }
    else {
      imgFrame = Math.floor(frame / 30)
      ctx.drawImage(heartDeadImg, 32 * imgFrame, 0, 32, 32, x, y, HEART_SIZE, HEART_SIZE)
    }
}

function renderRoundInfo(frame, ctx) {
  let round = Math.floor(frame / (TIME_BETWEEN_ROUNDS * FPS))
  let nextRoundIn = TIME_BETWEEN_ROUNDS - Math.floor( frame % (TIME_BETWEEN_ROUNDS * FPS) / FPS )

  if (true) { //todo check if no virus
    round++

    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Round " + round, 800 , 50);

    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("in", 800 , 82);

    ctx.font = '32px "Press Start 2P"';
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(nextRoundIn, 800 , 130);
  }
}

function renderDefenderUi(id, position, defender, ctx) {
  ctx.drawImage(defendersImg, 32 * id, 0, 32, 32, 800, position, 100, 100)
  ctx.font = '12px "Press Start 2P"';
  ctx.fillStyle = "blue";
  ctx.textAlign = "left";
  ctx.fillText("Lvl " + defender.level, 710 , position + 55);
  //ctx.fillText("Dmg " + TILES[defender.type].damage*defender.level, 725 , 580);
  if (!defender.built) {
    ctx.font = '9px "Press Start 2P"';
    ctx.fillText("(Build me)", 710 , position + 80);
  }
}

function renderUi(gameState, ctx) {
  let frame = gameState.frame
  ctx.drawImage(uiImg, 700, 0)
/*
  ctx.drawImage(defendersImg, 32, 0, 32, 32, 800, 500, 100, 100)
  ctx.font = '12px "Press Start 2P"';
  ctx.fillStyle = "blue";
  ctx.textAlign = "left";
  ctx.fillText("Lvl 1", 725 , 555);
  ctx.fillText("Dmg 3", 725 , 580); */
  renderDefenderUi(1, 500, gameState.defenders["venom"], ctx)
  renderDefenderUi(0, 600, gameState.defenders["std"], ctx)
  renderDefenderUi(3, 700, gameState.defenders["sniper"], ctx)
  renderDefenderUi(2, 800, gameState.defenders["splash"], ctx)

  if (gameState.status === GAMESTATUS_PLAY) {
    renderRoundInfo(frame, ctx)
  }
}

function renderSniperLaser(projectile, ctx) {
  ctx.beginPath();
  ctx.lineWidth = 10
  ctx.strokeStyle = "magenta"
  ctx.moveTo(projectile.originX, projectile.originY)
  ctx.lineTo(projectile.destinationX, projectile.destinationY)
  ctx.stroke();
}

function renderProjectiles(projectiles, frame, ctx) {
  for (let p in projectiles) {
    if (projectiles[p].type === "sniper") {
      renderSniperLaser(projectiles[p], ctx)
    }
    else {
      ctx.beginPath();
      ctx.arc(projectiles[p].x, projectiles[p].y, 10, 0, 2 * Math.PI, false);
      ctx.fillStyle = projectiles[p].color;
      ctx.fill();
    }
  }
}

function renderBackground(ctx) {
  ctx.drawImage(backgroundImg, 0, 0)
}

function renderStartScreenBackground(ctx) {
  ctx.drawImage(startBackgroundImage, 0, 0)
}

function renderTitle(gameState, frame, ctx) {
  ctx.drawImage(title1Img, 0, 0, 103, 16, 150, 150, 600, 135)
  ctx.drawImage(title2Img, 0, 0, 75, 16, 235, 300 , 425, 135)

  let imgFrame = Math.floor((frame % 60) / 30) % 2

  if (imgFrame === 1) {
    ctx.font = '32px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("PRESS SPACE KEY", CANVAS_Y / 2 , 580);
  }

if (frame > 30) {
    ctx.fillText("Adrià Giralt - 2020", CANVAS_Y / 2 , 800);
    ctx.fillText("LUDUM DARE 46", CANVAS_Y / 2 , 850);
  }

  if (gameState.starting) {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + ((frame - 100) / 60) + ')'
      ctx.fillRect(0, 0, CANVAS_X, CANVAS_Y);
  }
}

function renderGameOverText(frame, round, restarting, restartCounter, ctx) {
  ctx.font = '20px "Press Start 2P"';
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", CANVAS_X / 2 , 300);

  if (frame > 120) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("YOU REACHED ROUND " + round, CANVAS_X / 2 , 500)
  }

  if (frame > 180) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("YOU SHOULD BE PROUD", CANVAS_X / 2 , 550)
  }

  if ( frame > 240 && Math.floor((frame%60)/30) === 0) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("PRESS SPACE TO GO BACK TO MAIN MENU", CANVAS_X / 2 , 600)
  }

  if (restarting) {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + (Math.min(restartCounter,100) / 100) + ')'
      ctx.fillRect(0, 0, CANVAS_X, CANVAS_Y);
  }

}

function renderWinText(frame, round, restarting, restartCounter, ctx) {
  ctx.font = '20px "Press Start 2P"';
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("YOU MADE IT", CANVAS_X / 2 , 300);

  if (frame > 120) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("YOU BEAT THE FINAL ROUND", CANVAS_X / 2 , 500)
  }

  if (frame > 180) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("YOU'RE AWESOME <3", CANVAS_X / 2 , 550)
  }

  if ( frame > 240 && Math.floor((frame%60)/30) === 0) {
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("PRESS SPACE TO GO BACK TO MAIN MENU", CANVAS_X / 2 , 600)
  }

  if (restarting) {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + (Math.min(restartCounter,100) / 100) + ')'
      ctx.fillRect(0, 0, CANVAS_X, CANVAS_Y);
  }

}

function render (gameState, c, ctx) {
  let frame = gameState.frame
  ctx.clearRect(0, 0, c.width, c.height)

  if (gameState.status === GAMESTATUS_PLAY || (gameState.status === GAMESTATUS_OVER && gameState.frame < 150) || (gameState.status === GAMESTATUS_WIN && gameState.frame < 150)) {
    renderBackground(ctx)

    renderUi(gameState, ctx)

    renderHeart(gameState.heartHp, frame, ctx)

    renderDefenders(gameState.defenders, gameState.player, frame, ctx)

    renderPlayer(gameState.player, frame, ctx)

    renderViruses(gameState.viruses, frame, ctx)

    renderProjectiles(gameState.projectiles, frame, ctx)

    if (gameState.status === GAMESTATUS_WIN) {
      ctx.fillStyle = 'rgba(0, 0, 0, ' + (Math.min(frame,100) / 100) + ')'
      ctx.fillRect(0, 0, CANVAS_X, CANVAS_Y);
    }
  }

  else if (gameState.status === GAMESTATUS_START) {
    renderStartScreenBackground(ctx)

    renderTitle(gameState, frame, ctx)
  }

  else if (gameState.status === GAMESTATUS_OVER) {
    let frame = gameState.frame - 150

    renderStartScreenBackground(ctx)

    renderGameOverText(frame, gameState.round, gameState.restarting, gameState.restartCounter, ctx)
  }

  else if (gameState.status === GAMESTATUS_WIN) {
    let frame = gameState.frame - 150

    renderStartScreenBackground(ctx)

    renderWinText(frame, gameState.round, gameState.restarting, gameState.restartCounter, ctx)
  }
}
