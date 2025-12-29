const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");
var particles = []
addEventListener('resize', () => {
    particles = []
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
    init()
})

function init(){
    for (var i = 0; i < 200;i++){
        particles.push(new Particle())
    }
}

class Particle {
    constructor(){
        this.pivotPoint = Math.random() * canvas.width;     
        this.shift = Math.random() * Math.PI * 2;       
        this.tightness = 30 + Math.random() * 70;           // Wavelength 
        this.amplitude = 10 + Math.random() * 40;           // Swing scale 
        this.radius = 3
        this.x = Math.random() * canvas.width
        this.y = (Math.random() * canvas.height) + canvas.height + this.radius
        this.vy = 1+ Math.random() * 3
    }

    calEquation(){
        return this.pivotPoint + Math.sin((this.y / this.tightness) + this.shift) * this.amplitude
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }
    update(){
        this.y -= this.vy 
        this.x = calEquation()
    }
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (var i = 0; i < particles.length;i++){
        const particle = particles[i]
        particle.draw()
        particle.update()
    }
    requestAnimationFrame(animate)
    // console.log(particles)
}
init()
animate()