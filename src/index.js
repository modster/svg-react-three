import "./styles.css";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

let mesh;
var renderer = new THREE.WebGLRenderer({ antialias: true });
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);

camera.position.set(0, 0, 0);

var scene = new THREE.Scene();

renderer.render(scene.camera);

let shapes = [];
const svgMarkup = `<svg
pointer-events="none"
width="230"
height="230"
viewBox="0 0 252 251"
fill="none"
>
<path
  pointer-events="all"
  stroke="black"
  stroke-miter-limit="10"
  stroke-width="1px"
  d="M241.296
11V145.167C188.641 145.167 145.999 187.267 145.999 239.254H10C10 113.273
113.588 11 241.296 11Z"
  fill="gold"/>
</svg>`;

const loader = new SVGLoader();
const svgData = loader.parse(svgMarkup);

const svgGroup = new THREE.Group();

const material = new THREE.MeshBasicMaterial({ color: "gold" });

svgData.paths.forEach((path, i) => {
  shapes = path.toShapes(true);
});

shapes.forEach((shape, i) => {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 20,
    bevelEnabled: false
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -1000);

  scene.add(mesh);
});

requestAnimationFrame(render);

function render() {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
