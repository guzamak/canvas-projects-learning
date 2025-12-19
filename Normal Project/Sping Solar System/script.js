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

class Vector {

}
class Planet {
    constructor(x, y,scale, dx, dy, rotate, type, color) {
    // position xy
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = rotate;
    this.color = color;
    this.scale = scale;
    // normal and sun
    this.type = type;
    // shape xy
    this.updateShape()
  }
  draw(){

  }
  update(){
    
  }
}