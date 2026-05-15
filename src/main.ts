import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const geometry = new THREE.BoxGeometry(2.5, 2.5, 6); 
const material = new THREE.MeshStandardMaterial({ color: 0x2a5f9e, metalness: 0.6, roughness: 0.4 });
const container = new THREE.Mesh(geometry, material);
scene.add(container);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

camera.position.set(0, 5, 12);

function animate() {
  requestAnimationFrame(animate);
  container.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});