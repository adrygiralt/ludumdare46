// i have no idea of what i'm doing - Ludum Dare 46
let gameState = new GameState(); //here goes everything about the stats of the game (hp, monsters alive, machines...)

//start game
gameState.initPlayer(PLAYER_START_X, PLAYER_START_Y, PLAYER_SPEED)

//canvas and context
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false;

//stuff to make the typing thing work
window.addEventListener('keyup', (e) => {
   if (DEFENDER_LETTERS.includes(e.key)) {
   gameState.addToBuffer(e.key)
 }
});

gameState.spawnVirus("corona")

function gameLoop() {

  logic(gameState); //here is where things happen

  render(gameState, c, ctx); //here is where things are drawn

  window.requestAnimationFrame(gameLoop); //next frame
}

window.requestAnimationFrame(gameLoop); //first frame
