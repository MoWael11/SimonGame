const buttonColours:Array<string> = ["red", "blue", "green", "yellow"]

let gamePattern:Array<string> = []
let userClickedPattern:Array<string> = []
let level:number
const numberStorage = localStorage.getItem('number')

if (numberStorage) {
  level = parseInt(numberStorage)
} else {
  level = 0
}

let started:boolean = false

const buttons = document.querySelectorAll('.game') as NodeListOf<HTMLDivElement>
const playButton = document.getElementById('play') as HTMLDivElement
const score = document.getElementById('score') as HTMLSpanElement
const aside = document.querySelector('aside') as HTMLDivElement
const text = document.getElementById('level-title') as HTMLHeadingElement
const body = document.body as HTMLBodyElement
const rulesButton = document.getElementById('rules') as HTMLDivElement 
const rules = document.getElementById('rules-content') as HTMLDivElement
const rulesButtonClose = document.getElementById('rules-close') as HTMLDivElement
score.innerHTML = level.toString()

const nextSequence = () => {
  userClickedPattern = []
  level++
  text.textContent = `Level ${level}`
  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
  animatePress(randomChosenColour)
}

const playSound = (name: string) => {
  var audio = new Audio()
  audio.src = `../SimonGame/sounds/${name}.mp3`
  audio.play()
}

const animatePress = (currentColor: string) => {
  const button = document.getElementById(currentColor) as HTMLDivElement
  button.classList.add('pressed')
  setTimeout(() => { 
    button.classList.remove('pressed')
  }, 100)
}

const checkAnswer = (currentLevel: number) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout( () => {nextSequence()}, 1000)}
    } else {
    playSound('wrong')
    body.classList.add('game-over')
    text.textContent = `You lost!, with a score of ${level}`
    setTimeout(() => {
      body.classList.remove('game-over')
    }, 200);
    started = false
    gamePattern = []
    aside.classList.remove('hide')
    if (+(score.innerHTML) < level) {
      score.innerHTML = level.toString()
      localStorage.setItem('number', level.toString())
    }
    level = 0
  }
} 

playButton.addEventListener('click', () => {
  started = true
  aside.classList.add('hide')
  text.textContent = `Level ${level}`
  nextSequence();
})

buttons.forEach(button => {
  button.addEventListener('click', (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).id && started) {
      const userChosenColour = (e.target as HTMLDivElement).id
      userClickedPattern.push(userChosenColour)
      playSound(userChosenColour)
      animatePress(userChosenColour)
      checkAnswer(userClickedPattern.length - 1)
    }
  })
})

rulesButton.addEventListener('click', () => {
  rules.classList.remove('hide')
})

rulesButtonClose.addEventListener('click', () => {
  rules.classList.add('hide')
})
