const FPS = 60
const CANVAS_X = 900
const CANVAS_Y = 900
const GAME_WIDTH = 700
const GAME_HEIGHT = 900
const GAMESTATUS_START = 0
const GAMESTATUS_PLAY = 1
const GAMESTATUS_OVER = 2

//player initialisation
const PLAYER_SPEED = 200
const PLAYER_START_X = 350
const PLAYER_START_Y = 500
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
  SNIPER: {x: 150, y: 650, color: "magenta", name: "sniper", id: 3, delay: 240, offset: 0},
  VENOM: {x: 150, y: 450, color: "green", name: "venom", id: 1, delay: 120, offset: 60},
  SPLASH: {x: 550, y: 650, color: "yellow", name: "splash", id: 2, delay: 120, offset: 0},
  STD: {x: 550, y: 450, color: "white", name: "std", id: 0, delay: 60, offset: 30}
}
const DEFENDER_SIZE = 100
const DEFENDER_SECONDS_ALIVE = 20
const DEFENDER_MAX_SECONDS_ALIVE = 60

const DEFENDER_LETTERS = "fjrughtydkeislwoapqvbcnxmz"

//VIRUS
const VIRUS_SPAWN_LIMIT = 50
const VIRUS_HORIZONTAL_LIMIT = 650
const VIRUS_STARTLINE = 70
const VIRUS_SIZE = 50
const VIRUS_SPEED = 100

const VIRUS = {
  koffing: {hp: 5, speed: 70, damage: 5, id: 0},
  frog: {hp: 10, speed: 70, damage: 10, id: 1},
  jelly: {hp: 8, speed: 120, damage: 8, id: 2},
  illuminati: {hp: 40, speed: 60, damage: 50, id: 3}
}

const VIRUS_NAMES = ["koffing", "frog", "jelly", "illuminati"]

const ROUNDS = [
  [0,3,0,0], //1
  [6,0,0,0],
  [0,0,3,0],
  [0,5,0,0],
  [10,0,0,0], //5
  [0,0,5,0],
  [0,0,0,1],
  [0,7,0,0],
  [14,0,0,0],
  [0,0,7,0], //10
  [0,10,0,0],
  [20,0,0,0],
  [0,10,0,0],
  [0,0,0,2],
  [10,5,5,1] //15
]

//PROJECTILES
const PROJECTILES = {
  sniper: {color: "magenta", name: "sniper", id: 3, damage: 15},
  venom: {color: "green", name: "venom", id: 1, damage: 1},
  splash: {color: "yellow", name: "splash", id: 2, damage: 1},
  std: {color: "white", name: "std", id: 0, damage: 3}
}
const PROJECTILE_SPEED = 200
const PROJECTILE_ACCELERATION = 200
const PROJECTILE_MAX_ACCEL = 100
const PROJECTILE_INTERACTION_DISTANCE = 30

const TIME_BETWEEN_ROUNDS = 24

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
