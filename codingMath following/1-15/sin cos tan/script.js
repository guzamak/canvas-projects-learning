const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
    init()
})
  
function init(){
    const startPos = canvas.height / 2;
    for(var angle = 0; angle < Math.PI * 2 ; angle+=.01){
        var radius = 200
        //  x = circle line in that angle like 2pir = 360 * r = circle circumference
        var x = angle * radius
        var y = Math.tan(angle) * radius
        // var y = Math.cos(angle) * radius
        // var y = Math.sin(angle) * radius
        ctx.fillRect(x, startPos + y, 5, 5)
    }
}

init()