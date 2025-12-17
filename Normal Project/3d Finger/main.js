const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");
const fl = 300;

addEventListener('resize', () => {
    sakuras = []
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
})



function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
}

function rotation3D(x, y, z, ax, ay, az) {
  // need to make it rotation by change origin to 3d box not sence

  const rx = degreesToRadians(ax);
  const ry = degreesToRadians(ay);
  const rz = degreesToRadians(az);

  // Rotate around X axis
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);
  let x1 = x;

  // Rotate around Y axis
  let z2 = z1 * Math.cos(ry) - x1 * Math.sin(ry);
  let x2 = z1 * Math.sin(ry) + x1 * Math.cos(ry);
  let y2 = y1;

  // Rotate around Z axis
  let x3 = x2 * Math.cos(rz) - y2 * Math.sin(rz);
  let y3 = x2 * Math.sin(rz) + y2 * Math.cos(rz);
  let z3 = z2;

  return { x: x3, y: y3, z: z3 };
}



class MiddleFinger{

  constructor(x,y,z,scale){
    this.x = x
    this.y = y
    this.z = z
    this.scale = scale
    this.vertexs = []
    this.setup()
  }

  setup(){
    this.vertexs[0] = { x: -500, y: -500, z: 1000 };
    this.vertexs[1] = { x:  500, y: -500, z: 1000 };
    this.vertexs[2] = { x:  500, y: -500, z: 500 };
    this.vertexs[3] = { x: -500, y: -500, z: 500 };
    this.vertexs[4] = { x: -500, y: 500, z: 1000 };
    this.vertexs[5] = { x:  500, y: 500, z: 1000 };
    this.vertexs[6] = { x:  500, y: 500, z: 500 };
    this.vertexs[7] = { x: -500, y: 500, z: 500 };
    // INIT VALUE
    for (var i = 0; i < this.vertexs.length; i++){
      this.vertexs[i] = {x: (this.vertexs[i].x * this.scale) + this.x , y:( this.vertexs[i].y * this.scale) + this.y, z:( this.vertexs[i].z * this.scale) + this.z}
      const {x,y,z} = rotation3D(this.vertexs[i].x,this.vertexs[i].y,this.vertexs[i].z,0,0,0)
      this.vertexs[i].x = x
      this.vertexs[i].y = y
      this.vertexs[i].z = z
    }
  }

  // rotation(xAngle,yAngle,zAngle){

  // }

  // CALCUALTE FAKE 3Ds
	project() {
		for(var i = 0; i < this.vertexs.length; i++) {
			var p = this.vertexs[i],
				scale = fl / (fl + p.z);

			p.sx = p.x * scale;
			p.sy = p.y * scale;
		}
	}

	drawLine() {
		var p = this.vertexs[arguments[0]];
		ctx.moveTo(p.sx, p.sy);

		for(var i = 1; i < arguments.length; i++) {
			p = this.vertexs[arguments[i]];
			ctx.lineTo(p.sx, p.sy);
		}
		// ctx.fill();
	}

  drawPoint() {

  }

	update() {
		this.project();
		ctx.beginPath();
		this.drawLine(0, 1, 2, 3, 0);
		this.drawLine(4, 5, 6, 7, 4);
		this.drawLine(0, 4);
		this.drawLine(1, 5);
		this.drawLine(2, 6);
		this.drawLine(3, 7);
		ctx.stroke();
	}

}


const middleFinger = new MiddleFinger(0,0,0,1)

function animate() {
  requestAnimationFrame(animate);

  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  middleFinger.update();
}

animate()