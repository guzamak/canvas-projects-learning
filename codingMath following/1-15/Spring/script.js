//  f  = kx
const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");
springPoint = vector.create(canvas.width / 2, canvas.height  / 2),
weight = particle.create(Math.random() * canvas.width, Math.random() * canvas.height , 50, Math.random() * Math.PI * 2),
// k = 0.01 + Math.random() * .5;
k = 0.015
weight.radius = 20;
weight.friction = 0.5 + Math.random() * .5;

// addEventListener("mousemove", function(event) {
//     springPoint.setX(event.clientX);
//     springPoint.setY(event.clientY);
// });




  
function animation (){
    ctx.clearRect(0, 0, canvas.width , canvas.height);
    var distance = springPoint.subtract(weight.position)
    var springForce = distance.multiply(k);
    // 
	weight.velocity.addTo(springForce);
	weight.update();

	ctx.beginPath();
	ctx.arc(weight.position.getX(), weight.position.getY(), weight.radius,0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
	ctx.arc(springPoint.getX(), springPoint.getY(), 4,0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(weight.position.getX(), weight.position.getY());
    ctx.lineTo(springPoint.getX(), springPoint.getY());
    ctx.stroke();
    requestAnimationFrame(animation);
}

animation()