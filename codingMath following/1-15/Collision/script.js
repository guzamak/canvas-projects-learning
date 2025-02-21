const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

let mouseX = undefined
let mouseY = undefined
circle1 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 50 + Math.random() * 100
};
circle2 = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 50 + Math.random() * 100
};

addEventListener("mousemove", (e) => {
    mouseX = e.pageX
    mouseY = e.pageY
    circle2.x = mouseX
    circle2.y = mouseY
})
  
function animation (){
    ctx.clearRect(0, 0, canvas.width , canvas.height);
    ctx.beginPath()
    // เช็คการ collape ของวงกลม จริงๆมีหลายวิธีที่จะ check ปกติใช้ หรือ 4 ครั่ง เเต่ครั้งนี้ใช้ รัศมี
    if (utils.circleCollision(circle2, circle1)){
        ctx.fillStyle = "red"
    }else{
        ctx.fillStyle = "black"
    }
    ctx.arc(circle1.x, circle1.y, circle1.radius,0,Math.PI*2,false)
    ctx.arc(circle2.x, circle2.y, circle2.radius,0,Math.PI*2,false)
    ctx.fill()
    requestAnimationFrame(animation);
}

animation()