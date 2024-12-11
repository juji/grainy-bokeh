
const colors = [
  '#FFC312',
  '#C4E538',
  '#12CBC4',
  '#FDA7DF',
  '#ED4C67',
  '#F79F1F',
  '#A3CB38',
  '#EE5A24',
  '#009432',
  '#EA2027',
  '#0652DD',
  '#D980FA',
  '#9980FA',
  '#ED4C67'
]

function randomColor(){
  return colors[Math.floor(Math.random() * colors.length)];
}

export class Ball {

  elm: HTMLDivElement
  radius = 0
  diameter = 0
  x = 0
  y = 0
  color = ''
  speedX = 0
  speedY = 0
  accelX = 0
  accelY = 0

  leftBorder = 0
  topBorder = 0
  rightBorder = 0
  bottomBorder = 0

  blur = 0
  maxSpeed = 0.5
  accelDelta = 0.001
  // state = {}

  constructor(elm: HTMLDivElement){

    this.elm = elm

    const smaller = Math.min(window.innerHeight, window.innerWidth)
    this.radius = Math.round((smaller * 0.2 * Math.random())) + Math.round((Math.random() * 300))
    this.blur = 50 + Math.round(Math.random() * 200)

    this.x = Math.random() * window.innerHeight
    this.y = Math.random() * window.innerWidth
    this.color = randomColor()

    this.speedX = 0.005 + Math.random() * (Math.random() < .5 ? 1 : -1)
    this.speedY = 0.005 + Math.random() * (Math.random() < .5 ? 1 : -1)

    this.leftBorder = this.radius * Math.random()
    this.topBorder = this.radius * Math.random()
    this.rightBorder = window.innerWidth - (this.radius * Math.random())
    this.bottomBorder = window.innerHeight - (this.radius * Math.random())

    this.elm.style.setProperty('--width', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--height', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--color', this.color)
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
    this.elm.style.setProperty('--blur', this.blur + 'px')

    // do i want to save the state?
    // this.state = JSON.parse(JSON.stringify(this))

  }

  onResize(){
    this.rightBorder = window.innerWidth - (this.radius * Math.random())
    this.bottomBorder = window.innerHeight - (this.radius * Math.random())
  }


  animate(){
    if(this.x > this.rightBorder){
      this.accelX -= this.accelDelta
    }

    if(this.x < this.leftBorder){
      this.accelX += this.accelDelta
    }

    if(this.y > this.bottomBorder){
      this.accelY -= this.accelDelta
    }

    if(this.y < this.topBorder){
      this.accelY += this.accelDelta
    }

    this.x += Math.max(Math.min(this.speedX + this.accelX, this.maxSpeed), -this.maxSpeed)
    this.y += Math.max(Math.min(this.speedY + this.accelY, this.maxSpeed), -this.maxSpeed)
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
    
  }

}
