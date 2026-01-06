window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d")
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;

    var target = {
        x: width,
        y: Math.random() * height,
    }
    var position = {
        x: 0,
        y: Math.random() * height,
    }
    var ease = 0.1;
    const update = () =>{
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(position.x, position.y, 10,0,Math.PI*2),false;
        context.fill();

        // basic easing (accel)
        //  vx vy graph
        //  **
        //    **
        //       ***
        //          ****
        //               0
        // ขยับช้าลงเรี่อยๆตาม dx dy ที่ลดลง
        var dx = target.x - position.x
        var dy = target.y - position.y
        var vx = dx * ease
        var vy = dy * ease

        position.x = position.x + vx
        position.y = position.y + vy
        requestAnimationFrame(update)
    }
    update()
    document.addEventListener("mousemove",(e) => {
        target.x = e.clientX
        target.y = e.clientY
    })
    // document.addEventListener("click",(e) => {
    //     target.x = e.clientX
    //     target.y = e.clientY
    // })
}