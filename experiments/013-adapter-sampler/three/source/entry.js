import * as THREE from "three";

const mount = document.getElementById("three-stage");
const width = 1920;
const height = 1080;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(1);
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
camera.position.set(0, 0.7, 5);

const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
const material = new THREE.MeshStandardMaterial({
  color: 0x9bf0ca,
  roughness: 0.42,
  metalness: 0.18,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1.6, -0.1, 0);
scene.add(cube);

scene.add(new THREE.AmbientLight(0xffffff, 0.38));
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(3, 4, 5);
scene.add(key);

function draw(time) {
  cube.rotation.x = time * 0.9;
  cube.rotation.y = time * 1.4;
  cube.position.y = Math.sin(time * Math.PI) * 0.25;
  renderer.render(scene, camera);
}

window.__timelines = window.__timelines || {};
window.__timelines["three-adapter"] = {
  duration: () => 3,
  pause: () => undefined,
  seek: draw,
};

draw(0);

