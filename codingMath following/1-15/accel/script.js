const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height =  window.innerHeight
  
    init()
})

particles = []
numParticles = 1


function init() {
    for(var i = 0; i < numParticles; i += 1) {
        // ขยับไปในทิศลบ -90 ( ขึ้นข้างบนเพราะหามุมจากจุดเริ่มต้น )
        let angle = -Math.PI / 2 
        // 0,canvas.height,speed,-90 
		particles.push(particle.create(0, canvas.height , 10, angle ));
	}
}

init()

// ความเร่งปกติ
const accel = vector.create(0.1,0.1)
// เเรงโนมถ่วงประเภทหนึ่งทำให้ใช้ฟังก์ชั้นเดียวกันได้
// const gavity = vector.create(0,0.1)

function animation(){

    ctx.clearRect(0, 0, canvas.width , canvas.height);

    for(var i = 0; i < numParticles; i += 1) {
        var p = particles[i];
        p.update();
        p.accelerate(accel);

        ctx.beginPath();
        ctx.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
        ctx.fill();
    }
    requestAnimationFrame(animation);

}
animation()