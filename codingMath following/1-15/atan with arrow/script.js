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

// หามุมจากจุดลุกศรกับเมาส์
addEventListener("mousemove", function(event) {
  dx = event.pageX - arrowX;
  dy = event.pageY - arrowY;
  angle = Math.atan2(dy, dx);
})

function animation(){
  requestAnimationFrame(animation)
  var radius = 200
  arrowX =  a * radius
  // canvas.height * .4 = r ที่ไม่เท่ากันทำให้เคลื่อนที่ไม่เป็นวงกลมจะเป็นวงรีเเทน
  arrowY = canvas.height / 2 + Math.sin(a) * canvas.height * .4;
  a += .01;
  if (arrowX > canvas.width){
    arrowX = 0
    a = 0
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // ถ้าไม่ translate สามารถนำ arrowX, arrowY ไปบวกกับตัวข้างล่างได้
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