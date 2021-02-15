var planegeometry = new THREE.PlaneGeometry(5, 20, 32);
var planematerial = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planegeometry, planematerial);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const x = camera.position.x;
const y = camera.position.y;

var cursorX;
var cursorY;
document.onmousemove = function (e) {
  cursorX = e.pageX;
  cursorY = e.pageY;
};
setInterval("checkCursor()", 5000);
function checkCursor() {
  //alert(x + (10 * (cursorX - 0.5 * window.innerWidth)) / window.innerWidth);
  //alert(cursorX);
  //alert(cube.position.x);
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
scene.add(plane);
camera.position.z = 5;

const z = camera.position.z;

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

window.addEventListener("click", function () {
  let amount =
    x + (10 * (cursorX - 0.5 * window.innerWidth)) / window.innerWidth;
  if (cube.position.x > amount - 0.5 && cube.position.x < amount + 0.5) {
    cube.material.color.setHex(0xff00ff); //if cube is clicked
  } else {
    cube.material.color.setHex(0x0000ff);
  }
});

function someFunc() {}

var animate = function () {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  camera.position.set(
    x + (10 * (cursorX - 0.5 * window.innerWidth)) / window.innerWidth,
    y - (10 * (cursorY - 0.5 * window.innerHeight)) / window.innerHeight,
    z
  );

  renderer.render(scene, camera);
};

animate();
