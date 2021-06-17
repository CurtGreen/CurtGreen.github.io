import './style.css';

import * as THREE from 'https://cdn.skypack.dev/three';


//Create a scene for our 3D elements
const scene = new THREE.Scene();
//Create a camera to view our scene and set its FOV, Aspect Ratio, Near and Far view distance
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Create a renderer and attach it to the canvas element.
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

//Configure renderer to device
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);

//Move camera position for better view
camera.position.setZ(8);
moveCamera();



//Create a Torus from geometry and a material
const geometry = new THREE.TorusBufferGeometry(8, 0.4, 16, 80);
const material = new THREE.MeshPhongMaterial({ color: 0x33aa47});
const torus = new THREE.Mesh(geometry, material);

torus.position.setZ(7);
torus.position.setX(-4);
scene.add(torus);

//Add lighting into the scene
const pointLight = new THREE.PointLight(0x6666ff);
pointLight.position.set(10,10,10);


const ambientLight = new THREE.AmbientLight(0xFFFFFF);

scene.add(pointLight, ambientLight);


//Create Stars and add them to the scene
Array(400).fill().forEach(addStar);
Array(50).fill().forEach(addFatStar);

//Add a background image to the scene
const spaceTexture = new THREE.TextureLoader().load('./images/Space-Background.jpg');
scene.background = spaceTexture;

//Add Avatar Image Cube
const curtisTexture = new THREE.TextureLoader().load('./images/curtis.jpg');
const curtis = new THREE.Mesh(
  new THREE.BoxBufferGeometry(2, 2, 2),
  new THREE.MeshPhongMaterial({map: curtisTexture})
);
curtis.position.setX(4);
curtis.position.setZ(-12);

scene.add(curtis);

// Add a moon object
const moonTexture = new THREE.TextureLoader().load('./images/moon_color_texture.jpg');
const moonBumpTexture = new THREE.TextureLoader().load('./images/moon_bumpmap.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereBufferGeometry(5, 32, 32),
  new THREE.MeshPhongMaterial( {
    map: moonTexture,
    bumpMap: moonBumpTexture,
  })
);

moon.position.setZ(30);
moon.position.setX(-20);
scene.add(moon);

//Add onscroll event listener
document.body.onscroll = moveCamera;

//Call Renderer function
animate();


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xff99ff});
  const star = new THREE.Mesh(geometry, material);

  //Randomly generate float values for position data
  let starField = [THREE.MathUtils.randFloatSpread(280), THREE.MathUtils.randFloatSpread(150), THREE.MathUtils.randFloatSpread(280) ];
  const [x,y,z] = starField;
  star.position.set(x,y,z);
  scene.add(star);
}

function addFatStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0x0047bb});
  const star = new THREE.Mesh(geometry, material);

  //Randomly generate float values for position data
  let starField = [THREE.MathUtils.randFloatSpread(280), THREE.MathUtils.randFloatSpread(280), THREE.MathUtils.randFloatSpread(280) ];
  const [x,y,z] = starField;
  star.position.set(x,y,z);
  scene.add(star);
}

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;

  camera.position.z = top * -0.05;
  camera.position.x = top * -0.0002;
  camera.rotation.y = top * -0.0002;
}

function resize() {
  //Determine if we need to resize our scene
  if (renderer.domElement.width !== window.innerWidth || renderer.domElement.height !== window.innerHeight) {
  renderer.setSize( window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  }
}

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;

  curtis.rotation.x += 0.01;
  curtis.rotation.y += 0.005;
  curtis.rotation.z += 0.001;

  moon.rotation.y += 0.01;
  moon.rotation.z += 0.004;

  // Call resize to keep our scene responsive
  resize();
  renderer.render(scene, camera);
}