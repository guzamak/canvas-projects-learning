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
numParticles = 100


function init() {
    for(var i = 0; i < numParticles; i += 1) {
        let angle = Math.random() * Math.PI * 2
		particles.push(particle.create(canvas.width / 2, canvas.height / 2, Math.random() * 4 + 1,angle ));
	}
}

init()

function animation(){

    ctx.clearRect(0, 0, canvas.width , canvas.height);

    for(var i = 0; i < numParticles; i += 1) {
        var p = particles[i];
        p.update();

        ctx.beginPath();
        ctx.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
        ctx.fill();
    }
    requestAnimationFrame(animation);

}
animation()