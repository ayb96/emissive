import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();
const loader = new THREE.TextureLoader();
var texture = loader.load("/chartogneBump.jpg");
var dispalacement = loader.load("/disp.jpg");
var bump = loader.load("/chartogneMap.jpg");
var alpha = new THREE.TextureLoader().load("/alpha.jpg");
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial({
  color: "#d3b69c",
  map: texture,
  bumpMap: bump,
  bumpScale: 1,
  displacementMap: dispalacement,
  displacementScale: 0.3,
  emissive: "#d3b69c",
  emissiveIntensity: 0.9,
  alphaMap: alpha,
  transparent: true,
});
// material.color = new THREE.Color(0xff0000);

// Mesh

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

gui.add(sphere.rotation, "x");
sphere.rotation.x = -1;
// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
