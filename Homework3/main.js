angle = 0;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(255, 0, 255, 1);
    gl.enable(gl.DEPTH_TEST);
    Cube = new Cube(gl);
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    angle += 1;
    R = rotate(angle, [1,1,1]);
    Cube.mv = R;
    Cube.render();
    requestAnimationFrame(render);
}

window.onload = init;