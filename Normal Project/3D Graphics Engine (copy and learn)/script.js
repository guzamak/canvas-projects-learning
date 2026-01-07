const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CW = canvas.width
const CH = canvas.height
const CW2 = CW / 2
const CH2 = CH / 2

let angle = 0

// projection with matrix to make 3d dont use math woww
const proj = [
    [1,0,0],
    [0,1,0],
    [0,0,1],
]

// rotation martix
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
    ctx.arc(x, y, 5, 0, Math.PI * 2)
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

const P = []
const center = new Vertex(CW2, CH2, 0)

P[0] = new Vertex(400, 200, -100)
P[1] = new Vertex(600, 200, -100)
P[2] = new Vertex(400, 400, -100)
P[3] = new Vertex(600, 400, -100)
P[4] = new Vertex(400, 200, 100)
P[5] = new Vertex(600, 200, 100)
P[6] = new Vertex(400, 400, 100)
P[7] = new Vertex(600, 400, 100)

const T = [
    [0,1,2],[1,3,2],
    [5,4,7],[4,6,7],
    [4,0,6],[0,2,6],
    [1,5,3],[5,7,3],
    [4,5,0],[5,1,0],
    [2,3,6],[3,7,6],
]

const CP = []
const CT = []
const radius = 150
const segments = 12

for (let i = 0;  i <= segments; i++){
    const theta = i * Math.PI / segments;

    for (let j = 0 ; j <= segments; j++){
        const phi = j * 2 * Math.PI / segments;

        const x = radius * Math.sin(theta) * Math.cos(phi)
        const y = radius * Math.sin(theta) * Math.sin(phi)
        const z = radius * Math.cos(theta)

        CP.push(new Vertex(x,y,z))
    }
}

const pointsPerRow = segments +1;
for (let i= 0; i < segments; i++){
    for (let j = 0; j < segments; j++){
        const a = i * pointsPerRow +j
        const b = a + 1;
        const c = a + pointsPerRow;
        const d = c + 1

        CT.push([a,b,c])
    }
}

const engine = () => {
    angle += 0.02
    ctx.clearRect(0,0,CW,CH)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,CW,CH)
    // P.forEach((v) => v.draw())
    const projected = []
    for (let v of P){
        // now origin is 0,0 nedd to change to top right centeralize origin to centerx , centery (midden of screen)
        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        // console.log(translated)
        let rotated = multMat(rotZMat(angle), translated);
        rotated = multMat(rotXMat(angle),rotated)
        rotated = multMat(rotYMat(angle),rotated)
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        let proj2D = multMat(proj, movedBack);

        // drawVertex(proj2D.x,proj2D.y)
        projected.push(proj2D)
    }
    

    // vertices + triangle = make everything in 3d
    for (let t of T){
        const p1 = projected[t[0]]
        const p2 = projected[t[1]]
        const p3 = projected[t[2]]
        
        drawLine(p1.x,p1.y,p2.x,p2.y)
        drawLine(p2.x,p2.y,p3.x,p3.y)
        drawLine(p3.x,p3.y,p1.x,p1.y)
    }

    const circle_projected = []
    for (let v of CP){
        // now origin is 0,0 nedd to change to top right centeralize origin to centerx , centery (midden of screen)
        // อยู่จุด 0 0 0 อยู่เเล้ว
        // let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        // console.log(translated)
        let rotated = multMat(rotZMat(angle), v);
        rotated = multMat(rotYMat(angle),rotated)
        rotated = multMat(rotXMat(angle),rotated)
        let movedBack = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        let proj2D = multMat(proj, movedBack);

        drawVertex(proj2D.x,proj2D.y)
        circle_projected.push(proj2D)
    }


     for (let t of CT){
        const p1 = circle_projected[t[0]]
        const p2 = circle_projected[t[1]]
        const p3 = circle_projected[t[2]]
        
        drawLine(p1.x,p1.y,p2.x,p2.y)
        drawLine(p2.x,p2.y,p3.x,p3.y)
        drawLine(p3.x,p3.y,p1.x,p1.y)
    }
    requestAnimationFrame(engine)
}

engine()