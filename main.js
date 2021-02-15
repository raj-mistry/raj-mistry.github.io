var height = window.innerHeight;
var rotationAmount = 0.01;
var stopR = false;
var stopSize = false;
var planegeometry = new THREE.PlaneGeometry(5, 20, 32);
var planematerial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planegeometry, planematerial);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / height,
    0.1,
    1000
);
//75, 0.1 1000
const x = camera.position.x;
const y = camera.position.y;

var cursorX;
var cursorY;
document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
};
setInterval("checkCursor()", 5000);

function checkCursor() {
    //alert(x + (10 * (cursorX - 0.5 * window.innerWidth)) / window.innerWidth);
    //alert(cursorX);
    //alert(cube.position.x);
}

var renderer = new THREE.WebGLRenderer({ alpha: true, });

renderer.setSize(window.innerWidth, height);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(plane);
camera.position.z = 5;
cube.position.z = 1;

const z = camera.position.z;

window.addEventListener("resize", function() {
    var width = window.innerWidth;
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

window.addEventListener("click", function() {
    randomColor = Math.random();
    cube.material.color.setHex(randomColor * 0xffffff); //if cube is clicked
    plane.material.color.setHex((1 - randomColor) * 0xffffff); //if cube is clicked
    rotationAmount += 0.05;
    if (stopSize == false) {
        cube.position.z = 2;
        stopSize = true;
    }
});

function someFunc() {}

var animate = function() {
    requestAnimationFrame(animate);

    cube.rotation.x += rotationAmount;
    cube.rotation.y += rotationAmount;

    if ((rotationAmount > 0.01) || (stopR == true)) {
        rotationAmount += -0.002;
    } else {
        stopR = false;
    }

    if (stopSize == true) {
        cube.position.z += -0.01;

        if (cube.position.z < 1.0) {
            stopSize = false;
        }
    }



    renderer.render(scene, camera);
};

animate();