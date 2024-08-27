const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let mousePos = { x: undefined, y: undefined };
let startPos = { x: undefined, y: undefined };
let isCharging = false;

let balls = [];

addEventListener("mousedown", () => {
  isCharging = true;

  const newBall = new Ball(mousePos.x, mousePos.y, 0, 1);
  balls.push(newBall);
});

addEventListener("mouseup", () => {
  isCharging = false;

  lastBall.isThrown = true;
  const dx = -(lastBall.x - startPos.x) * 0.1; 
  const dy = -(lastBall.y - startPos.y) * 0.1;

  lastBall.vx = dx;
  lastBall.vy = dy;
});

addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  if (isCharging) {
    startPos.x = e.clientX;
    startPos.y = e.clientY;
  }
});

function getDistance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

class Energy {
  constructor(x, y, rad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.opacity = 0;
    this.maxOpacity = 1;
    this.colorArray = ["173, 216, 230","0,0,0"]
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length )];
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
  update(index) {
    const angle = Math.atan2(lastBall.y - this.y, lastBall.x - this.x);
    const speed = 2;
    this.dx = Math.cos(angle) * speed;
    this.dy = Math.sin(angle) * speed;

    this.x += this.dx;
    this.y += this.dy;

    if (!isCharging && this.opacity > 0) {
      this.opacity -= 0.2;
    }

    if (this.opacity < this.maxOpacity) {
      this.opacity += 0.02;
    }

    this.draw();
  }
}

class Ball {
  constructor(x, y, rad, dRad) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dRad = dRad;
    this.vx = 0;
    this.vy = 0;
    this.isThrown = false;
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, this.rad / 2, this.x, this.y, this.rad);
    gradient.addColorStop(0, 'white'); 
    gradient.addColorStop(1, 'lightblue'); 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, false);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (!this.isThrown) {
      this.x = mousePos.x;
      this.y = mousePos.y;
      if (isCharging && this.rad < 200 && !this.isThrown) {
        this.rad += this.dRad;
      } else if (!isCharging && this.rad > 0) {
        this.isThrown = true;
      }
    } else {
      if (this.vx == 0 && this.vy == 0 && this.rad > 0) {
        this.rad -= 0.25;
      } else {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 1.005;
        this.vy *= 1.005;
      }
    }
    // if (
    //   this.x <= 0  ||
    //   this.x >= canvas.width ||
    //   this.y <= 0 ||
    //   this.y >= canvas.height 
    // ) {
    // }

    this.draw();
  }
}
class Explosion{}

let energyParticles = [];
let lastBall;

function spawnEnergyParticles() {
  const rad = Math.random() * 3;
  const x = mousePos.x + Math.random() * 300 * (Math.random() < 0.5 ? -1 : 1);
  const y = mousePos.y + Math.random() * 300 * (Math.random() < 0.5 ? -1 : 1);
  energyParticles.push(new Energy(x, y, rad));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });

  if (isCharging) {
    for (let i = 0; i < 1; i++) {
      spawnEnergyParticles(mousePos.x + 300, mousePos.y + 300);
    }
  }
  lastBall = balls[balls.length - 1];

  energyParticles.forEach((particle, index) => {
    particle.update(index);
    if (
      getDistance(particle.x, particle.y, lastBall.x, lastBall.y) < lastBall.rad
    ) {
      energyParticles.splice(index, 1);
    }
  });

}

animate();
