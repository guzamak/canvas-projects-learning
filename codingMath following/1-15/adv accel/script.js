const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

ship = particle.create(canvas.width / 2, canvas.height / 2, 0, 0)
addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
    ship = particle.create(canvas.width / 2, canvas.height / 2, 0, 0)
})

thrust = vector.create(0, 0)
angle = 0
turningLeft = false
turningRight = false
thrusting = false;
window.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        case 38: // up
            thrusting = true;
            break;
            
        case 37: // left
            turningLeft = true;
            break;
            
        case 39: // right
            turningRight = true;
            break;

        default:
            break;
            
    }
});

window.addEventListener("keyup", function(event) {
    switch(event.keyCode) {
        case 38: // up
            thrusting = false;
            break;
            
        case 37: // left
            turningLeft = false;
            break;
            
        case 39: // right
            turningRight = false;
            break;

        default:
            break;
            
    }
});


function animation(){

    ctx.clearRect(0, 0, canvas.width , canvas.height );

    if(turningLeft) {
        angle -= 0.05;
    }
    if(turningRight) {
        angle += 0.05;
    }

    thrust.setAngle(angle);

    if(thrusting) {
        thrust.setLength(0.1);
    }
    else {
        thrust.setLength(0);
    }
    
    ship.accelerate(thrust);
    ship.update();

    ctx.save();
    //  transale and rotate start position 
    ctx.translate(ship.position.getX(), ship.position.getY());
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(-10, -7);
    ctx.lineTo(-10, 7);
    ctx.lineTo(10, 0);
    if(thrusting) {
        ctx.moveTo(-10, 0);
        ctx.lineTo(-18, 0);
    }
    ctx.stroke();

    ctx.restore(); 	

    if(ship.position.getX() > canvas.width  ) {
        ship.position.setX(0);
    }
    if(ship.position.getX() < 0) {
        ship.position.setX(canvas.width );
    }
    if(ship.position.getY() > canvas.height ) {
        ship.position.setY(0);
    }
    if(ship.position.getY() < 0) {
        ship.position.setY(canvas.height);
    }

    requestAnimationFrame(animation);

}
animation()