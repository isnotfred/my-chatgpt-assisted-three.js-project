// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// OrbitControls for camera movement
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// GLTFLoader to load 3D models
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS scene
const scene = new THREE.Scene();

// Setup camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Global variables
let object;
let controls;
const objToRender = 'flower_bouquet';

// Load the 3D model
const loader = new GLTFLoader();
loader.load(
  `/assets/flower_bouquet/scene.gltf`,
  function (gltf) {
    console.log("Model loaded:", gltf);
    object = gltf.scene;
    object.scale.set(15, 15, 15);
    object.position.y = -4;
    object.rotation.x = THREE.MathUtils.degToRad(25);
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);


// Set up renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Camera position
camera.position.z = 15;

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// OrbitControls setup
controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === "flower_bouquet") {
    object.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
}

// Handle responsive resizing
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (object) {
    if (window.innerWidth < 768) {
      object.scale.set(8, 8, 8);
      camera.position.z = 12;
    } else {
      object.scale.set(10, 10, 10);
      camera.position.z = 15;
    }
  }
});

// Start animation
animate();
