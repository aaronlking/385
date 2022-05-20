const vertexShader = () => {
    return `
      uniform float opacity;
  
      varying vec3 pos;
  
      void main() {
          pos = position;
  
          gl_Position = projectionMatrix
              * modelViewMatrix
              * vec4(
                  position.x,
                  position.y,
                  position.z,
                  1.0
              );
      }
    `;
  };
  
  const fragmentShader = () => {
    return `
      uniform float opacity;
  
      varying vec3 pos;
  
      void main() {
          vec4 red = vec4(0.678,0.027,0.027, opacity);
          vec4 white = vec4(1.,0.98,0.98, opacity);
          vec4 blue = vec4(0.008,0.031,0.749, opacity);
          vec4 yellow = vec4(0.8,0.722,0., opacity);
          vec4 green = vec4(0.216,0.631,0.024, opacity);
          vec4 orange = vec4(1.,0.682,0., opacity);
  
          vec4 black = vec4(0.0, 0.0, 0.0, opacity);
  
          float scale = 0.499;
  
          bool front = pos.z > scale;
          bool back = pos.z < -1.0 * scale;
          bool top = pos.y > scale;
          bool bottom = pos.y < -1.0 * scale;
          bool right = pos.x > scale;
          bool left = pos.x < -1.0 * scale;
  
          if (front) {
              gl_FragColor = red;
          } else if (back) {
              gl_FragColor = orange;
          } else if (top) {
              gl_FragColor = white;
          } else if (bottom) {
              gl_FragColor = yellow;
          } else if (right) {
              gl_FragColor = blue;
           } else if (left) {
              gl_FragColor = green;
          } else {
              gl_FragColor = black;
          }
      }
    `;
  };
  
  export { vertexShader, fragmentShader };
  