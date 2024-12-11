import './style.css'
import { Ball } from './ball'

;(function(){

  const balls = document.querySelectorAll('.ball')
  const jsBalls: Ball[] = []
  balls.forEach((ball) => {

    jsBalls.push(new Ball(ball as HTMLDivElement))

  })

  requestAnimationFrame(function anim(){

    jsBalls.forEach(ball => ball.animate())
    requestAnimationFrame(anim)

  })

  window.addEventListener('resize',() => {
    jsBalls.forEach(ball => ball.onResize())
  })

})();