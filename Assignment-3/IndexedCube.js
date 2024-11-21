/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        
        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        // Define vertices for the cube (8 unique vertices)
        const vertices = new Float32Array([
            // Positions (x, y, z) followed by Colors (r, g, b, a)
            -0.5, -0.5,  0.5,  1.0, 0.0, 0.0, 1.0, // Front-bottom-left (Red)
             0.5, -0.5,  0.5,  0.0, 1.0, 0.0, 1.0, // Front-bottom-right (Green)
             0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Front-top-right (Blue)
            -0.5,  0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Front-top-left (Yellow)
            -0.5, -0.5, -0.5,  1.0, 0.0, 1.0, 1.0, // Back-bottom-left (Magenta)
             0.5, -0.5, -0.5,  0.0, 1.0, 1.0, 1.0, // Back-bottom-right (Cyan)
             0.5,  0.5, -0.5,  1.0, 0.5, 0.0, 1.0, // Back-top-right (Orange)
            -0.5,  0.5, -0.5,  0.5, 0.0, 0.5, 1.0  // Back-top-left (Purple)
        ]);

        // Define indices for the 12 triangles (36 indices total)
        const indices = new Uint16Array([
            // Front face
            0, 1, 2,   0, 2, 3,
            // Back face
            4, 5, 6,   4, 6, 7,
            // Left face
            0, 3, 7,   0, 7, 4,
            // Right face
            1, 5, 6,   1, 6, 2,
            // Top face
            3, 2, 6,   3, 6, 7,
            // Bottom face
            0, 4, 5,   0, 5, 1
        ]);

        // Create and set up position attribute
        this.positionAttribute = new Attribute(gl, program, "aPosition", 3, gl.FLOAT);
        this.positionAttribute.setData(vertices.filter((_, i) => i % 7 < 3)); // Extract positions (x, y, z)

        // Create and set up color attribute
        this.colorAttribute = new Attribute(gl, program, "aColor", 4, gl.FLOAT);
        this.colorAttribute.setData(vertices.filter((_, i) => i % 7 >= 3)); // Extract colors (r, g, b, a)

        // Create and set up index buffer
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        // Draw function
        this.draw = () => {
            program.use();

            // Enable attributes
            this.positionAttribute.enable();
            this.colorAttribute.enable();

            // Bind index buffer
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            // Draw the cube using gl.drawElements
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            // Disable attributes after drawing
            this.positionAttribute.disable();
            this.colorAttribute.disable();
        };
    }
};
