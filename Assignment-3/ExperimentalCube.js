/////////////////////////////////////////////////////////////////////////////
//
//  ExperimentalCube.js
//
//  A cube defined ???
//

class ExperimentalCube {
    constructor(gl, vertexShader, fragmentShader) {

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        const positions = new Float32Array([
            // Quad for a single face (two triangles)
            -0.5, -0.5, 0.0, // Bottom-left
             0.5, -0.5, 0.0, // Bottom-right
             0.5,  0.5, 0.0, // Top-right
            -0.5,  0.5, 0.0, // Top-left
        ]);

        const indices = new Uint16Array([
            0, 1, 2,
            0, 2, 3,
        ]);
        
        const faceNormals = new Float32Array([
            0, 0, 1,  // Front face
            0, 0, -1, // Back face
            -1, 0, 0, // Left face
            1, 0, 0,  // Right face
            0, 1, 0,  // Top face
            0, -1, 0, // Bottom face
        ]);

        this.positionAttribute = new Attribute(gl, program, "aPosition", 3, gl.FLOAT);
        this.positionAttribute.setData(positions);

        this.normalAttribute = new Attribute(gl, program, "aNormal", 3, gl.FLOAT, true); // Per-instance
        this.normalAttribute.setData(faceNormals);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        this.draw = () => {
            program.use();

            this.positionAttribute.enable();
            this.normalAttribute.enable();

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            gl.drawElementsInstanced(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0, faceNormals.length / 3);

            this.positionAttribute.disable();
            this.normalAttribute.disable();
        };
    }
};
