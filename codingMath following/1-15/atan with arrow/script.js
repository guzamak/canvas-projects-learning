const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
})
  

let angle = 0
let arrowX = canvas.width / 2
let arrowY = canvas.height  / 2
let a = 0;

addEventListener("mousemove", function(event) {
  dx = event.pageX - arrowX;
  dy = event.pageY - arrowY;
  angle = Math.atan2(dy, dx);
})

function animation(){
  requestAnimationFrame(animation)
  var radius = 200
  // update arrow pos
  // follow circle
  // arrowX = canvas.width / 2 + Math.cos(a) * canvas.height * .4;
  arrowX =  a * radius
  arrowY = canvas.height / 2 + Math.sin(a) * canvas.height * .4;
  a += .01;
  if (arrowX > canvas.width){
    arrowX = 0
    a = 0
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(arrowX, arrowY);
  // rotate to mouse with arctan()
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(-20, 0);
  ctx.moveTo(20, 0);
  ctx.lineTo(10, -10);
  ctx.moveTo(20, 0);
  ctx.lineTo(10, 10);
  ctx.stroke();

  ctx.restore();

}

animation()