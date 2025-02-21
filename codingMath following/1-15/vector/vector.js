var vector = {
	_x: 1,
	_y: 0,

	// สร้าง obj vector เเบบไม่ใช้ class ทำไมไม่รู้
	create: function(x, y) {
		var obj = Object.create(this);
		// ใช้ setx y เพื่อ set ตัวเเปรของ obj ที่สร้าง
		obj.setX(x);
		obj.setY(y);
		return obj;
	},

	// setter getter
	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	// set มุมใหม่เเล้วหาตำเเหน่งใหม่
	setAngle: function(angle) {
		// length = r 
		var length = this.getLength();
		// cos(angle) = x/r
		// r * cos(angle) = x 
		this._x = Math.cos(angle) * length;
		// sin(angle) = y/r
		// r * sin(angle) = y
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	// set ความยาวรัศมีจากจุด (0,0) ( def =  มุมซ่ายบนหน้าจอ ) ใหม่เเล้วหาตำเเหน่งใหม่
	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	// ระยะห่างระหว่าง x y กับจุด (0,0) ( พีทาโกรัส )
	// 		(0,0)
	//  	y|\ Length
	//       |_\ (x,y)
	//        x
	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	// หาค่ามาใช้อีกที เช่น grav
	// กับ vector อีกตัว 
	// [x1,y1] + [x2,y2] = [x1+x2,y1+y2]
	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - v2.getX(), this._y - v2.getY());
	},

	// กับ scalar 
	// [x1,y1] * val = [val*x1,val*y1]
	multiply: function(val) {
		return vector.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return vector.create(this._x / val, this._y / val);
	},

	// ต่างกับข้างบนตรงที่ไม่ return ใช้กับตัวเอง
	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	}
};