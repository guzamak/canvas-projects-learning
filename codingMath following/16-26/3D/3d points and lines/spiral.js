window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		fl = 300,
		points = [],
		numPoints = 1000,
		centerZ = 2000,
		radius = 1000,
		baseAngle = 0,
		rotationSpeed = 0.01;


	for(var i = 0; i < numPoints; i += 1) {
		var point = {
			angle: 0.2 * i,
			y: 2000 - 4000 / numPoints * i + (Math.random() * 100 * [1,-1][Math.floor(Math.random()*2)])
		};
		point.x = Math.cos(point.angle + baseAngle) * radius;
		point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
		points.push(point);
	}

	context.translate(width / 2, height / 2);

	document.body.addEventListener("mousemove", function(event) {
		rotationSpeed = (event.clientX - width / 2) * 0.00005;
		ypos = (event.clientY - height / 2) * 2;
	});

	update();

function update() {
    baseAngle += rotationSpeed;
    context.clearRect(-width / 2, -height / 2, width, height);

    context.beginPath();

    for (var i = 0; i < numPoints; i++) {
        var point = points[i],
            perspective = fl / (fl + point.z);

        var px = point.x * perspective;
        var py = point.y * perspective;

        if (i === 0) {
            context.moveTo(px, py);
        } else {
            context.lineTo(px, py);
        }

        context.fillStyle = "red";
        context.arc(px, py, 10 * perspective, 0, Math.PI * 2);

		// context.fillStyle = "red";
        // context.fill();

        // rotation matrix update
        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
    }

    context.strokeStyle = "black";
    context.stroke();

    requestAnimationFrame(update);
}
}