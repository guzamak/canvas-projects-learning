window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight
		fl = 300,
		points = [],
		numpoints = 1000;

	for(var i = 0; i < numpoints; i += 1) {
		var card = {
			x: utils.randomRange(-1000, 1000),
			y: utils.randomRange(-1000, 1000),
			z: utils.randomRange(0, 5000),
		};
		points.push(card);
	}
	
	points.sort(zsort);

	function zsort(a,b){
		return b.z - a.z;
	}
	context.translate(width / 2, height / 2);
	
function update() {
		context.clearRect(-width / 2, -height / 2, width, height);
		for(var i = 0; i < numpoints; i += 1) {
				var card = points[i],
					perspective = fl / (fl + card.z);
					context.save();
					context.scale(perspective, perspective);
					context.translate(card.x , card.y );
					context.beginPath();
					context.fillStyle = "red";
					context.arc(0, 0, 10, 0, 2 * Math.PI);
					context.fill()
			
			context.restore();
			
			card.z -= 5;
			if(card.z < 0) {
					card.z = 5000;
				}
				}
				requestAnimationFrame(update);
}
update();
}