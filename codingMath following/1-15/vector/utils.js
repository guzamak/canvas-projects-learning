var utils = {
	// แปลงค่าจากช่วง [min, max] เป็นช่วง [0, 1]
	norm: function(value, min, max) {
		return (value - min) / (max - min);
	},

	// แปลงค่าจากช่วง [0, 1] กลับไปเป็นช่วง [min, max]
	lerp: function(norm, min, max) {
		return (max - min) * norm + min;
	},

	// แปลงค่าจากช่วง [sourceMin, sourceMax] ไปเป็นช่วง [destMin, destMax]
	map: function(value, sourceMin, sourceMax, destMin, destMax) {
		return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	},

	// จำกัดค่าที่รับให้อยู่ในช่วง [min, max]
	clamp: function(value, min, max) {
		return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	},

	// คำนวณระยะห่างระหว่างจุดสองจุด ( ในรูปแบบ {x, y} )
	distance: function(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	},

	// คำนวณระยะห่างระหว่างพิกัด (x0, y0) กับ (x1, y1)
	distanceXY: function(x0, y0, x1, y1) {
		var dx = x1 - x0,
			dy = y1 - y0;
		return Math.sqrt(dx * dx + dy * dy);
	},

	// ตรวจสอบว่ามีการชนกันระหว่างวงกลมสองวงหรือไม่
	circleCollision: function(c0, c1) {
		return utils.distance(c0, c1) <= c0.radius + c1.radius;
	},

	// ตรวจสอบว่าจุด (x, y) อยู่ภายในวงกลมที่กำหนดหรือไม่
	circlePointCollision: function(x, y, circle) {
		return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	},

	// ตรวจสอบว่าจุด (x, y) อยู่ภายในสี่เหลี่ยมหรือไม่
	pointInRect: function(x, y, rect) {
		return utils.inRange(x, rect.x, rect.x + rect.width) &&
		       utils.inRange(y, rect.y, rect.y + rect.height);
	},

	// ตรวจสอบว่าค่าอยู่ในช่วง [min, max] หรือไม่
	inRange: function(value, min, max) {
		return value >= Math.min(min, max) && value <= Math.max(min, max);
	},

	// ตรวจสอบว่าช่วง [min0, max0] มีการตัดกับช่วง [min1, max1] หรือไม่
	rangeIntersect: function(min0, max0, min1, max1) {
		return Math.max(min0, max0) >= Math.min(min1, max1) && 
			   Math.min(min0, max0) <= Math.max(min1, max1);
	},

	// ตรวจสอบว่าสี่เหลี่ยมสองรูปมีการตัดกันหรือไม่
	rectIntersect: function(r0, r1) {
		return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
			   utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	}
}