/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {

        // let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        const vertices = new Float32Array([
            // Front face
            -0.5, -0.5,  0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
             0.5, -0.5,  0.5,  0.0, 1.0, 0.0, 1.0, // Bottom-right (Green)
             0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Top-right (Blue)
            -0.5, -0.5,  0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
             0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Top-right (Blue)
            -0.5,  0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Top-left (Yellow)

            // Back face
            -0.5, -0.5, -0.5,  1.0, 0.0, 1.0, 1.0, // Bottom-left (Magenta)
            -0.5,  0.5, -0.5,  0.0, 1.0, 1.0, 1.0, // Top-left (Cyan)
             0.5,  0.5, -0.5,  1.0, 0.5, 0.0, 1.0, // Top-right (Orange)
            -0.5, -0.5, -0.5,  1.0, 0.0, 1.0, 1.0, // Bottom-left (Magenta)
             0.5,  0.5, -0.5,  1.0, 0.5, 0.0, 1.0, // Top-right (Orange)
             0.5, -0.5, -0.5,  0.5, 0.0, 0.5, 1.0, // Bottom-right (Purple)

            // Left face
            -0.5, -0.5, -0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
            -0.5, -0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Bottom-right (Yellow)
            -0.5,  0.5,  0.5,  0.0, 1.0, 0.0, 1.0, // Top-right (Green)
            -0.5, -0.5, -0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
            -0.5,  0.5,  0.5,  0.0, 1.0, 0.0, 1.0, // Top-right (Green)
            -0.5,  0.5, -0.5,  0.0, 0.0, 1.0, 1.0, // Top-left (Blue)

            // Right face
             0.5, -0.5, -0.5,  0.5, 0.0, 0.5, 1.0, // Bottom-left (Purple)
             0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Top-right (Blue)
             0.5, -0.5,  0.5,  0.0, 1.0, 1.0, 1.0, // Bottom-right (Cyan)
             0.5, -0.5, -0.5,  0.5, 0.0, 0.5, 1.0, // Bottom-left (Purple)
             0.5,  0.5, -0.5,  1.0, 0.5, 0.0, 1.0, // Top-left (Orange)
             0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Top-right (Blue)

            // Top face
            -0.5,  0.5, -0.5,  1.0, 0.0, 1.0, 1.0, // Bottom-left (Magenta)
            -0.5,  0.5,  0.5,  0.0, 0.0, 1.0, 1.0, // Bottom-right (Blue)
             0.5,  0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Top-right (Yellow)
            -0.5,  0.5, -0.5,  1.0, 0.0, 1.0, 1.0, // Bottom-left (Magenta)
             0.5,  0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Top-right (Yellow)
             0.5,  0.5, -0.5,  1.0, 0.5, 0.0, 1.0, // Top-left (Orange)

            // Bottom face
            -0.5, -0.5, -0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
             0.5, -0.5,  0.5,  0.0, 1.0, 1.0, 1.0, // Bottom-right (Cyan)
             0.5, -0.5, -0.5,  0.5, 0.0, 0.5, 1.0, // Top-right (Purple)
            -0.5, -0.5, -0.5,  1.0, 0.0, 0.0, 1.0, // Bottom-left (Red)
            -0.5, -0.5,  0.5,  1.0, 1.0, 0.0, 1.0, // Bottom-right (Yellow)
             0.5, -0.5,  0.5,  0.0, 1.0, 1.0, 1.0, // Top-right (Cyan)
        ]);

        // Create position and color attributes
        this.positionAttribute = new Attribute(gl, program, "aPosition", 3, gl.FLOAT);
        this.colorAttribute = new Attribute(gl, program, "aColor", 4, gl.FLOAT);

        // Set data for attributes
        this.positionAttribute.setData(vertices.filter((_, i) => i % 7 < 3)); // Positions
        this.colorAttribute.setData(vertices.filter((_, i) => i % 7 >= 3)); // Colors

        this.draw = () => {
            program.use();

            // Enable attributes
            this.positionAttribute.enable();
            this.colorAttribute.enable();

            // Draw cube using gl.drawArrays
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 7);

            // Disable attributes
            this.positionAttribute.disable();
            this.colorAttribute.disable();
        };
    }
};
