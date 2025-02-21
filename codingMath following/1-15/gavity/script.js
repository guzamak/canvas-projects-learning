//  กฎแรงโน้มถ่วงสากล g = G(Uniersal graitational constant) * mass / r**2
const canvas = document.querySelector("canvas");
canvas.width =  window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

addEventListener('resize', () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
})

let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight
const sun = particle.create(width / 2, height / 2, 0, 0)
const planet = particle.create(width / 2 + 200, height / 2, 10, -Math.PI / 2);

sun.mass = 50000;

update();


function update() {
		ctx.clearRect(0, 0, width, height);

		planet.gravitateTo(sun);
		planet.update();

		ctx.beginPath();
		ctx.fillStyle = "#ffff00";
		ctx.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "#0000ff";
		ctx.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false);
		ctx.fill();

		requestAnimationFrame(update);
}
