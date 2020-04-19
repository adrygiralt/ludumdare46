// i have no idea of what i'm doing - Ludum Dare 46
let gameState = new GameState(); //here goes everything about the stats of the game (hp, monsters alive, machines...)

//canvas and context
var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
ctx.imageSmoothingEnabled = false;

//stuff to make the typing thing work
window.addEventListener('keyup', (e) => {
  let key = e.key.toLowerCase()
   if (DEFENDER_LETTERS.includes(key)) {
   gameState.addToBuffer(key)
 }
});

gameState.setRound(0)

function gameLoop() {

  logic(gameState) //here is where things happen

  render(gameState, c, ctx) //here is where things are drawn

  window.requestAnimationFrame(gameLoop) //next frame
}

window.requestAnimationFrame(gameLoop) //first frame
