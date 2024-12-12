import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";

// Set up the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 10, 10);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x404040);
document.body.appendChild(renderer.domElement);

// Add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

// Add lights to the scene
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 1, 8);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.5));

// Function to create individual textures for each face
function createFaceTexture(number) {
  let canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  let ctx = canvas.getContext("2d");

  // Fill the canvas with a white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the number in the center
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.font = "bold 120px Arial";
  ctx.fillText(number, canvas.width / 2, canvas.height / 2);

  return new THREE.CanvasTexture(canvas);
}

// Create materials for each side of the dice
let materials = [
  new THREE.MeshBasicMaterial({ map: createFaceTexture(1) }), // Front
  new THREE.MeshBasicMaterial({ map: createFaceTexture(6) }), // Back
  new THREE.MeshBasicMaterial({ map: createFaceTexture(3) }), // Top
  new THREE.MeshBasicMaterial({ map: createFaceTexture(4) }), // Bottom
  new THREE.MeshBasicMaterial({ map: createFaceTexture(5) }), // Right
  new THREE.MeshBasicMaterial({ map: createFaceTexture(2) })  // Left
];

// Create the dice geometry and apply materials
let geometry = new THREE.BoxGeometry(5, 5, 5);
let dice = new THREE.Mesh(geometry, materials);
scene.add(dice);

// Add rolling animation logic
document.getElementById("rollDice").addEventListener("click", () => {
  rollDice(dice);
});

// Render the scene
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});

// Function to randomly rotate the dice
function rollDice(dice) {
  let randomX = Math.random() * 2 * Math.PI;
  let randomY = Math.random() * 2 * Math.PI;
  let randomZ = Math.random() * 2 * Math.PI;

  dice.rotation.set(randomX, randomY, randomZ);
}
