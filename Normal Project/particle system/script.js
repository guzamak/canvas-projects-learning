const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");
const gradient  = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
gradient.addColorStop(0, "white")
gradient.addColorStop(0.5, "magenta")
gradient.addColorStop(1, "blue")
ctx.fillStyle = gradient
ctx.strokeStyle = "black"

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
})
  
class Particle {
  constructor(effect){
    this.effect = effect
    this.radius = 15
    // make it not overflow border
    this.x = this.radius +  Math.random() * (this.effect.width - this.radius * 2)
    this.y = this.radius +  Math.random() * (this.effect.height - this.radius * 2)
    this.vx = Math.random() * 4 -2
    this.vy = Math.random() * 4 -2
  }
  draw(context) {
    // ctx.fillStyle = 'hsl('+ this.x * 0.5 +',100%,50%)'
    context.beginPath()
    context.arc(this.x,this.y,this.radius,0,Math.PI * 2)
    context.fill()
    context.stroke()
  }
  update(){
    this.x += this.vx
    if (this.x > this.effect.width - this.radius || this.x < this.radius ){
      this.vx *= -1
    }
        this.y += this.vy
    if (this.y > this.effect.height - this.radius || this.y < this.radius ){
      this.vy *= -1
    }
  }
}

class Effect {
  constructor(canvas){
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = []
    this.numberOfParticles = 200
    this.createParticles()
  }
  createParticles(){
    for (let i =0; i< this.numberOfParticles; i++){
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context){
    this.connectParicles(context)
    this.particles.forEach(particle => {
      particle.draw(context)
      particle.update()
    })
  }
  connectParicles(context){
    const maxDistance = 100;
    for (let a = 0 ; a < this.particles.length; a++){
      for (let b = a; b < this.particles.length; b++){
        const deltaX = this.particles[a].x - this.particles[b].x
        const deltaY = this.particles[a].y - this.particles[b].y
        const distance = Math.hypot(deltaX,deltaY);
        if (distance < maxDistance){
          context.save()
          // บรรยัดไตรยาง
          const opacity = 1-(distance/maxDistance)
          context.globalAlpha = opacity
          context.beginPath();
          context.moveTo(this.particles[a].x,this.particles[a].y)
          context.lineTo(this.particles[b].x,this.particles[b].y)
          context.stroke();
          context.restore()
        }
      }
    }
  }
}

const effect = new Effect(canvas)

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  effect.handleParticles(ctx)
  requestAnimationFrame(animate)
}
animate()