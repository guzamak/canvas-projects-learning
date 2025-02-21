var particle = {
	position: null,
	velocity: null,

	// สร้าง particle มี ตำเเหน่งกับความเร็ว
	create: function(x, y, speed, direction) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		return obj;
	},

	// บวก vector ( ตำเเหน่ง ) กับ vector ( ความเร็ว ) ในเเต่ละเฟรม
	update: function() {
		this.position.addTo(this.velocity);
	}
};