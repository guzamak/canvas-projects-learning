// xy angle เพิ่มในจำนวนที่ไม่เท่ากัน
const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
    init()
})
  
function init(yangle,xangle){
    const centerY = canvas.height / 2;
    const centerX = canvas.width / 2;
    var radius = 200
    var x = Math.cos(xangle) * radius + centerX
    var y = Math.sin(yangle) * radius + centerY
    ctx.fillRect(x, y, 30, 30)
}

let yangle = 0
let xangle = 0
let dxAngle = 0.1
let dyAngle = 0.131
function animation(){
  requestAnimationFrame(animation)
  ctx.clearRect(0,0, canvas.width,canvas.height)
  init(yangle,xangle)
  xangle += dxAngle
  yangle += dyAngle

}

animation()