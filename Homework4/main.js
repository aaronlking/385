var gl;
var year = 0;
var day = 0;
var near;
var far;


function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here

    //Earth radius is 6,371 km
    //Sun radius is 696,340 km
    //Moon radius is 1,737.4 km
    //Sun is ~ 4 times bigger than earth and ~ 8 times bigger than the moon.
    
    Sun = new Sphere(100,100);
    Earth = new Sphere(100,100);
    Moon = new Sphere(100,100);

    Sun.color = vec4(1, 1, 0, 1);
    Sun.radius = 17;

    Earth.color = vec4(0, 0, 1, 1);
    Earth.radius = 5;
    Earth.orbit = 30;

    Moon.color = vec4(1, 1, 1, 1);
    Moon.radius = 2;
    Moon.orbit = 8;

    near = 1;
    var Diameter = 2 * (Earth.orbit + Moon.orbit + Moon.radius + 5000);
    far = near + Diameter;
    
     //Calculation of viewing frustrum
     var aspect = (canvas.clientWidth / canvas.clientHeight);
     var angle = Math.atan((Diameter/2) / (near + (Diameter/2)));
     var fov = 2 * (angle);
 
     Sun.P = perspective(fov, aspect, near, far);
     Earth.P = perspective(fov, aspect, near, far);
     Moon.P = perspective(fov, aspect, near, far);
 
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    year += 1;
    day += 1;
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    /// Add your rendering sequence here
    ms = new MatrixStack();
    var v = translate(0.0, 0.0, -0.5 * (near + far));
    ms.load(v);
    
    ms.push();
    ms.scale(Sun.radius);
    Sun.MV = ms.current();
    Sun.render();
    ms.pop();

    ms.push();
    ms.rotate(year, vec3(0,1,0));
    ms.translate(Earth.orbit, 0, 0);
    ms.push();
    ms.rotate(day, vec3(1,0,0));
    ms.scale(Earth.radius);
    Earth.MV = ms.current();
    Earth.render();
    ms.pop();

    ms.rotate(day, vec3(0, 1, 0));
    ms.translate(Moon.orbit, 0, 0);
    ms.scale(Moon.radius);
    Moon.MV = ms.current();
    Moon.render();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;