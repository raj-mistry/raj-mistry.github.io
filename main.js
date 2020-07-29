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
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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
  alert("yo");
  let amount =
    x + (10 * (cursorX - 0.5 * window.innerWidth)) / window.innerWidth;
  if (cube.position.x > amount - 0.5 && cube.position.x < amount + 0.5) {
    alert("deleted");
  } else {
    alert("failed");
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
