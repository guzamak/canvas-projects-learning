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
    var easing = true;
    const update = () =>{
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(position.x, position.y, 10,0,Math.PI*2),false;
        context.fill();

        //  vx vy graph  velocity graph
        //  **
        //    **
        //       ***
        //          ****
        //               0
        // ขยับช้าลงเรี่อยๆตาม dx dy ที่ลดลง

        easing = easeTo(position,target,ease)
        if (easing){
            requestAnimationFrame(update)
        }
    }
    const easeTo = (position,target, ease) => {
        var dx = target.x - position.x
        var dy = target.y - position.y
        position.x += dx * ease
        position.y += dy * ease
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            position.x = target.x
            position.y = target.y
            return false;
        }
        return true;

    }
    update()
    // document.addEventListener("mousemove",(e) => {
    //     target.x = e.clientX
    //     target.y = e.clientY
    // })
    document.addEventListener("click",(e) => {
        target.x = e.clientX
        target.y = e.clientY
        // update รันเแพาะตอน click
        if (!easing) {
            easing = true;
            update()
        }
    })
}