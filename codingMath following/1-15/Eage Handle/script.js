const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

circle = particle.create(canvas.width / 2, canvas.height / 2, 10,180)

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
    circle.position.setX(canvas.width/2)
    circle.position.setY(canvas.height/2)
})
  
function animation (){
    ctx.clearRect(0, 0, canvas.width , canvas.height);
    ctx.beginPath()
    circle.update()
    ctx.arc(circle.position.getX(), circle.position.getY(), 10,0,Math.PI*2,false)
    ctx.fill()
    
    if(circle.position.getX() + circle.radius >= canvas.width) {
        circle.position.setX(canvas.width - circle.radius);
        circle.velocity.setX(circle.velocity.getX() * circle.bounce);
    }
    if(circle.position.getX() - circle.radius <= 0) {
        circle.position.setX(circle.radius);
        circle.velocity.setX(circle.velocity.getX() * circle.bounce);
    }
    if(circle.position.getY() + circle.radius >= canvas.height) {
        circle.position.setY(canvas.height - circle.radius);
        circle.velocity.setY(circle.velocity.getY() * circle.bounce);
    }
    if(circle.position.getY() - circle.radius <= 0) {
        circle.position.setY(circle.radius);
        circle.velocity.setY(circle.velocity.getY() * circle.bounce);
    }
    requestAnimationFrame(animation);
}

animation()