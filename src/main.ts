import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import HubModelManager from './HubModelManager';
import SkyboxManager from './SkyboxManager';
import UIManager from './UIManager';
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true});
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.set(-4, 2, -8);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 10;
controls.minDistance = 5;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.autoRotate = true;
controls.autoRotateSpeed = -0.5;
SkyboxManager.init("qwantani_noon_4k.hdr", scene, renderer);
UIManager.init();

const loader = new GLTFLoader();
loader.load('container_service_hub.glb', (gltf) => {
  console.log("Model loaded:", gltf);
  const model = gltf.scene
  HubModelManager.init(model);
  scene.add(model);
},
(progress) => {
  console.log(`Loading hub model: ${(progress.loaded / progress.total) * 100}%`);
},
(error) => {
  console.error("Error loading model:", error);
}
)

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});