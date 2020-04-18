FPS = 60
CANVAS_X = 900
CANVAS_Y = 900
GAME_WIDTH = 700
GAME_HEIGHT = 900

//player initialisation
const PLAYER_SPEED = 200
const PLAYER_START_X = 300
const PLAYER_START_Y = 400
const PLAYER_SIZE = 80
const PLAYER_INTERACTION = 40

//heart
const HEART_SIZE = 150
const HEART_X = 350
const HEART_Y = 800
const HEART_INITIAL_HP = 100
const HEART_HURT_DISTANCE = 50

//defenders
const DEFENDERS = {
  SNIPER: {x: 150, y: 650, color: "magenta", name: "sniper", id: 3},
  VENOM: {x: 150, y: 450, color: "green", name: "venom", id: 1, patata: 123},
  SPLASH: {x: 550, y: 650, color: "yellow", name: "splash", id: 2},
  STD: {x: 550, y: 450, color: "white", name: "std", id: 0}
}
DEFENDER_SIZE = 100
DEFENDER_SECONDS_ALIVE = 10
DEFENDER_MAX_SECONDS_ALIVE = 30

DEFENDER_LETTERS = "fjrughtydkeislwoapqvbcnxmz"

//VIRUS
const VIRUS_SPAWN_LIMIT = 50
const VIRUS_HORIZONTAL_LIMIT = 650
const VIRUS_STARTLINE = 70
const VIRUS_SIZE = 50
const VIRUS_SPEED = 100

//directions
const EAST = 0
const NORTHEAST = 1
const NORTH = 2
const NORTHWEST = 3
const WEST = 4
const SOUTHWEST = 5
const SOUTH = 6
const SOUTHEAST = 7

//utils
const distance = (ax, ay, bx, by) => {
  if (typeof bx === "undefined") {
    let x = ax.x
    bx = ay.x
    by = ay.y
    ay = ax.y
    ax = x
  }
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))
}

const randomLetters = (level) => {
  let r = ""
  for (let i = 0; i < level + 4; i++) {
      r += DEFENDER_LETTERS[Math.floor(Math.random() * Math.min(level+6, 26))]
  }
  return r
}
