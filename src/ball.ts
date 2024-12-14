
const colors = [
  // [255, 195, 18], // '#FFC312',
  [196, 229, 56], // '#C4E538',
  [18, 203, 196], // '#12CBC4',
  [253, 167, 223], // '#FDA7DF',
  [237, 76, 103], // '#ED4C67',
  [247, 159, 31], // '#F79F1F',
  [163, 203, 56], // '#A3CB38',
  [238, 90, 36], // '#EE5A24',
  [0, 148, 50], // '#009432',
  [234, 32, 39], // '#EA2027',
  [6, 82, 221], // '#0652DD',
  [217, 128, 250], // '#D980FA',
  [153, 128, 250], // '#9980FA',
  [237, 76, 103], // '#ED4C67'
]

function randomColor(){
  return colors[Math.floor(Math.random() * colors.length)].join(',');
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

  // blur = 0
  maxSpeed = 2
  accelDelta = 0.05
  // state = {}

  baseSpeed = 1

  constructor(elm: HTMLDivElement){

    this.elm = elm

    const smaller = Math.min(window.innerHeight, window.innerWidth)
    this.radius = Math.round((smaller * 0.5) + (-50 + (Math.random() * 150)))
    // this.blur = 45 + Math.round(Math.random() * 50)

    this.x = Math.random() * window.innerWidth // / 2
    this.y = Math.random() * window.innerHeight // / 2
    this.color = randomColor()

    this.speedX = this.baseSpeed + Math.random() * (Math.random() < .5 ? 1 : -1)
    this.speedY = this.baseSpeed + Math.random() * (Math.random() < .5 ? 1 : -1)

    this.leftBorder = this.radius * Math.random()
    this.topBorder = this.radius * Math.random()
    this.rightBorder = window.innerWidth - (this.radius * Math.random())
    this.bottomBorder = window.innerHeight - (this.radius * Math.random())

    this.elm.style.setProperty('--width', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--height', (this.radius * 2) + 'px')
    this.elm.style.setProperty('--color', this.color)
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
    // this.elm.style.setProperty('--blur', this.blur + 'px')

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

    this.x += Math.max(
      Math.min(this.speedX + this.accelX, this.maxSpeed), 
      -this.maxSpeed
    )
    
    this.y += Math.max(
      Math.min(this.speedY + this.accelY, this.maxSpeed), 
      -this.maxSpeed
    )
    
    this.elm.style.setProperty('--pos-x', this.x + 'px')
    this.elm.style.setProperty('--pos-y', this.y + 'px')
    
  }

}
