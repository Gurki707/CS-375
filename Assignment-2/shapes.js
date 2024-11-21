
let gl;

let sphere, cube, cone;
let matrixStack;
let sphereAngle = 0.0, cubeAngle = 0.0, coneAngle = 0.0;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    matrixStack = new MatrixStack();
    sphere = new Sphere(gl, 36, 18);
    cube = new Cube(gl);
    cone = new Cone(gl, 36, 18);
    
    render();
    
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    sphereAngle += 1.0;
    cubeAngle += 2.0;
    coneAngle += 3.0;

    matrixStack.push();

    matrixStack.translate([-1.5, 0.0, 0.0]); 
    matrixStack.rotate(sphereAngle, [0, 1, 0]); 
    matrixStack.scale(0.5); 

    sphere.MV = matrixStack.current();

    sphere.draw();
    
    matrixStack.pop();
    matrixStack.push();
    
    matrixStack.translate([0.0, 0.0, 0.0]); 
    matrixStack.rotate(cubeAngle, [1, 1, 0]); 
    matrixStack.scale(0.6); 
    cube.MV = matrixStack.current();
    cube.draw();
    matrixStack.pop();

    matrixStack.push();
    matrixStack.translate([1.5, Math.sin(coneAngle * Math.PI / 180) * 0.5, 0.0]); 
    matrixStack.rotate(coneAngle, [0, 0, 1]); 
    matrixStack.scale(0.5); 
    cone.MV = matrixStack.current();
    cone.draw();
    matrixStack.pop();
    
    requestAnimationFrame(render);
}

window.onload = init;


   
