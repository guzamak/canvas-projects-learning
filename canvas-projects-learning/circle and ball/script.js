const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}
addEventListener("resize", () => {
    stars = []
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
    ball.x = canvas.width/2
    ball.y = canvas.height/2
    circle.x = canvas.width/2
    circle.y = canvas.height/2
})

class Ball {
  constructor(rad, color) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.rad = rad;
    this.color = color;
    this.dx = -2 + Math.random() * 5 ;
    this.dy = 2; 
    this.gravity = 0.1; 
    this.speed = 3;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.dy += this.gravity;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

class Circle {
  constructor(rad, color) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.rad = rad;
    this.color = color;
    this.lineWidth = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    this.draw();
  }
}

const ball = new Ball(20, "white");
const circle = new Circle(200, "white");

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ball.update();
  circle.update();

  const distance = getDistance(ball.x, ball.y, circle.x, circle.y);

  // Check if the ball is colliding with the edge of the circle
  if (distance >= circle.rad - circle.lineWidth - ball.rad) {
    const angle = Math.atan2(ball.y - circle.y, ball.x - circle.x).toFixed(2);
    const randomSpeedX = Math.random() * 6;
    const randomSpeedY = Math.random() * 6;
    ball.dx = -Math.cos(angle) * (ball.speed + randomSpeedX) ;
    ball.dy = -Math.sin(angle) * (ball.speed + randomSpeedY) ;
  }
}

animate();