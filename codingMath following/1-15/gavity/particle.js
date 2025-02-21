var particle = {
	position: null,
	velocity: null,
	//  g = G(Uniersal graitational constant) * mass / r**2 เอามาหาเเรงโน้มถ่วง
	mass: 1,

	create: function(x, y, speed, direction) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		return obj;
	},

	accelerate: function(accel) {
		this.velocity.addTo(accel);
	},

	update: function() {
		this.position.addTo(this.velocity);
	},

	angleTo: function(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
	},

	distanceTo: function(p2) {
		var dx = p2.position.getX() - this.position.getX(),
			dy = p2.position.getY() - this.position.getY();

		return Math.sqrt(dx * dx + dy * dy);
	},

	// g = G(Uniersal graitational constant) * mass / r**2 
	gravitateTo: function(p2) {
		var grav = vector.create(0, 0),
		// p2 = ดาวอีกดวง
		// dist = r
		dist = this.distanceTo(p2);
		// หา speed ในเเต่ละ t
		grav.setLength(p2.mass / (dist * dist));
		// หา angle ในเเต่ละ t
		grav.setAngle(this.angleTo(p2));

		// เคลื่อนที่ไปตามมุมที่กำหนดตามเเรงโน้มถ่วงของทั้งดาวที่โคจร ( ความเร็ว )
		this.velocity.addTo(grav);
	}
};