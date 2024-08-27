const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    sakuras = []
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
    init()
})
  

function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}
function rotatePoint(x, y, centerx, centery, angle) {
    const radians = degreesToRadians(angle);
    const cosA = Math.cos(radians);
    const sinA = Math.sin(radians);

    // ลบออกก่อน เเล้วค่อยบวกตอนจบ
    const newX = x - centerx;
    const newY = y - centery;
    // Rotation matrix
    const rotatedX = newX * cosA - newY * sinA + centerx;
    const rotatedY = newX * sinA + newY * cosA + centery;

    return [rotatedX, rotatedY];
}

class Sakura {
  constructor(x, y,scale, dx, dy, rotate, type, color) {
    // position xy
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = rotate;
    this.color = color;
    this.scale = scale
    this.type = type;
    // shape xy
    this.updateShape()
  }
  updateShape() {
    this.shapeX = (this.type[0][0] + this.x) * this.scale;
    this.shapeY = (this.type[0][1] + this.y) * this.scale;
    this.leftXY = new Array(this.type[1].length); 
    this.rightXY = new Array(this.type[1].length);
    for(let i = 0; i < this.type[1].length; i+=2){
        const newposX = (this.type[1][i]+this.x)* this.scale;
        const newposY = (this.type[1][i+1]+this.y)* this.scale;
        const [rotatedX, rotatedY] = rotatePoint(newposX, newposY,this.shapeX,this.shapeY, this.angle);
        this.leftXY[i] = rotatedX;
        this.leftXY[i+1] = rotatedY;
    }
    for(let i = 0; i < this.type[2].length; i+=2){
        const newposX = (this.type[2][i]+this.x)* this.scale;
        const newposY = (this.type[2][i+1]+this.y)* this.scale;
        const [rotatedX, rotatedY] = rotatePoint(newposX, newposY,this.shapeX,this.shapeY, this.angle);
        this.rightXY[i] = rotatedX;
        this.rightXY[i+1] = rotatedY;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.shapeX, this.shapeY);
    ctx.bezierCurveTo(...this.leftXY);
    ctx.bezierCurveTo(...this.rightXY);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.dx
    this.y += this.dy;
    this.checkOutoffScreen()
    this.updateShape()
    this.draw();
  }

  checkOutoffScreen(){
    if (this.y  > canvas.height / this.scale){
        var { x, y, scale, dx, dy, rotate, type, color } = createSakura()
        this.y = y;
        this.x = x;
        this.scale = scale;
        this.dx = dx;
        this.dy = dy;
        this.rotate = rotate;
        this.type = type;
        this.color = color;
    }
  }
}

// [startxy leftxy[] rightxy[]] (bezierCurve)
// type1 = หัวใจยาว
// type 2 = ใบไม้
// type 3 = หัวใจสั่น

const sakuraType = [
  [
    [50, 50],
    [30, 10, 10, 100, 50, 150],
    [90, 100, 70, 10, 50, 50],
  ],
  [
    [50, 50], 
    [50, 50, 80, 20, 60, 60],
    [40, 80, 20, 100, 50, 50], 
  ],
  [
    [50, 50],
    [30, 30, 20, 80, 50, 100],
    [80, 80, 70, 30, 50, 50],
  ],
];

let sakuras = [];
const pinkColors = [
    '#FFC0CB',
    '#FFB6C1', 
    '#faa1af',

];
function createSakura(){
    var scale = 0.1 + Math.random() * 0.5;
    var x = Math.floor((Math.random() * canvas.width) / scale) + 300;
    var y = Math.floor((Math.random() * canvas.height) / scale) - (canvas.height / scale );
    var dx = -Math.random() * 0.4;
    var dy = (0.5 + Math.random() * 0.3);
    var type = sakuraType[Math.floor(Math.random() * sakuraType.length)];
    var rotate = 10 + Math.random() * 130;
    var color = pinkColors[ Math.floor(Math.random() * pinkColors.length)]
    return {x,y,scale,dx,dy,rotate,type,color}
}
function init() {
  for (var i = 0; i < 200; i++) {
    var { x, y, scale, dx, dy, rotate, type, color } = createSakura()
    sakuras.push(new Sakura(x,y,scale,dx,dy,rotate,type,color));
  }
}
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < sakuras.length; i++){
    sakuras[i].update()
  }
}

init()
animate()
