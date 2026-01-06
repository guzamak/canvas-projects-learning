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

}

engine()