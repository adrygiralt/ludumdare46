function direction() {
  let directions = { //it seems negative key should be quoted
    1: {1: 1, 0: 0, '-1': 7},
    0: {1: 2, 0: -1, '-1': 6},
    '-1': {1: 3, 0: 4, '-1': 5}
  }

  let h = (is_key_down("ArrowLeft") ? 1 : 0) - (is_key_down("ArrowRight") ? 1 : 0)
  let v = (is_key_down("ArrowUp") ? 1 : 0) - (is_key_down("ArrowDown") ? 1 : 0)

  return directions[h][v]
}

function logic(gameState) {
  if (gameState.status === GAMESTATUS_PLAY){
    //movePlayer
    let d = direction()
    gameState.movePlayer(d)

    if (is_key_down(" ")) {
      gameState.build()
    }

    gameState.defenderStep()

    gameState.moveViruses()

    gameState.moveProjectiles()
  }

  if (gameState.status === GAMESTATUS_START) {
    gameState.checkStart()
  }

  if (gameState.status === GAMESTATUS_OVER) {
    gameState.checkMenu()
  }

  gameState.nextFrame()
}
