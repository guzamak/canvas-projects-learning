// https://en.wikipedia.org/wiki/Torus
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CW = canvas.width
const CH = canvas.height
const CW2 = CW / 2
const CH2 = CH / 2

let angle = 0

const proj = [
    [1,0,0],
    [0,1,0],
    [0,0,1],
]

const rotZMat = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle),0],
        [Math.sin(angle), Math.cos(angle),0],
        [0,0,1]
    ]
}

const rotXMat = (angle) => {
    return [
        [1,0,0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
}

const rotYMat = (angle) => {
    return [
        [Math.cos(angle),0,Math.sin(angle)],
        [0,1,0],
        [-Math.sin(angle),0,Math.cos(angle)]
    ]
}

// martrix mul for use with rotation martix
function multMat(m,v){
    const {x,y,z} = v

    return {
        x : m[0][0] * x + m[0][1]  * y + m[0][2] * z,
        y : m[1][0] * x + m[1][1] * y + m[1][2] * z,
        z : m[2][0] * x + m[2][1] * y + m[2][2] * z,
    }
}

class Vertex {
    constructor(x = 0, y = 0 , z = 0){
        this.x = x
        this.y = y
        this.z = z
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.x , this.y, 5 , 0 , 2 * Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
    }
}


const drawVertex = (x, y) => {
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, Math.PI * 2)
    ctx.fillStyle = "white"
    ctx.fill()
}

const drawLine = (x1, y1 ,x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = "white"
    ctx.stroke();
}

class Torus {
    constructor(x,y,loops_n,segments,r,R){
        this.loops_n = loops_n
        this.segments = segments
        this.r  = r
        this.R  = R
        this.P = []
        this.T = []
        this.x = x
        this.y = y
    }
    init(){
        // built point
        const loop = 20
        const segments = 10
        const R = 150
        const r = 75
        for (let i = 0; i < segments ; i++) {
            // วงกลมเเนว 2d เเบบ xy
            const theta = i * 2 * Math.PI / segments;
            for (let j = 0; j < loop ; j++){
              const phi = j * 2 * Math.PI / loop;

            const x = (R + r * Math.sin(theta)) * Math.cos(phi);
            const y = (R + r * Math.sin(theta)) * Math.sin(phi);
            const z = r * Math.cos(theta);

                this.P.push(new Vertex(x,y,z))
                
            }
        }

        // make circle edge in y 
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < loop; j++) {
                // const a = (i * loop + j )
                // const b = (a + segments) 
            const a =  (i * loop + j )
            let b = a+1
            if (b >( (i+1) * loop )-1){
                b = (a - loop) + 1
            }
            // console.log(i, (i+1) * loop)a
            this.T.push([a, b]);
            }
        }
        // console.log(this.T)
        // make circle edge in z
         for (let i = 0; i < segments; i++) {
            for (let j = 0; j < loop; j++) {
                const a = (i * loop + j )
                let b = a + loop
                if (b >= (loop * segments)){
                    b -= (loop * segments)
                }
                this.T.push([a, b]);
            }
        }
        // console.log(this.T)

    }
}
const center = new Vertex(CW2, CH2, 0)
const donut = new Torus()
donut.init()

const animate = () => {
    angle += 0.02
    ctx.clearRect(0,0,CW,CH)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,CW,CH)
    const projected = []

    for (let v of donut.P){
        // now origin is 0,0 nedd to change to top right centeralize origin to centerx , centery (midden of screen)
        // let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        // console.log(translated)
        let rotated = multMat(rotZMat(angle), v);
        rotated = multMat(rotXMat(angle),rotated)
        rotated = multMat(rotYMat(angle),rotated)
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        let proj2D = multMat(proj, movedBack);

        drawVertex(proj2D.x,proj2D.y)
        projected.push(proj2D)
    }
    // console.log(projected)
    for (let t of donut.T){
        const p1 = projected[t[0]]
        const p2 = projected[t[1]]
        const p3 = projected[t[2]]
        
        drawLine(p1.x,p1.y,p2.x,p2.y)
        if (p3) {
            drawLine(p2.x,p2.y,p3.x,p3.y)
            drawLine(p3.x,p3.y,p1.x,p1.y)
        }
    }


    requestAnimationFrame(animate) 
} 

animate()