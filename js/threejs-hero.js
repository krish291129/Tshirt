// // ============================================
// // THREE.JS 3D T-SHIRT HERO
// // ============================================

// let scene, camera, renderer, tshirt, particles;
// let mouse = { x: 0, y: 0 };
// let targetRotation = { x: 0, y: 0 };
// let currentRotation = { x: 0, y: 0 };

// function initThreeJS() {
//   const canvas = document.getElementById('threejs-canvas');
//   if (!canvas) return;

//   // Scene setup
//   scene = new THREE.Scene();
//   scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);

//   // Camera setup
//   camera = new THREE.PerspectiveCamera(
//     45,
//     canvas.clientWidth / canvas.clientHeight,
//     0.1,
//     1000
//   );
//   camera.position.z = 8;

//   // Renderer setup
//   renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     alpha: true,
//     antialias: true
//   });
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   renderer.shadowMap.enabled = true;
//   renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//   // Lights
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//   scene.add(ambientLight);

//   const frontLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
//   frontLight.position.set(5, 5, 5);
//   frontLight.castShadow = true;
//   scene.add(frontLight);

//   const backLight = new THREE.DirectionalLight(0xff006e, 1);
//   backLight.position.set(-5, 3, -5);
//   scene.add(backLight);

//   const topLight = new THREE.PointLight(0x7000ff, 1.5, 50);
//   topLight.position.set(0, 10, 0);
//   scene.add(topLight);

//   // Create T-shirt geometry
//   createTShirt();

//   // Create particles
//   createParticles();

//   // Shadow plane
//   const planeGeometry = new THREE.PlaneGeometry(20, 20);
//   const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
//   const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//   plane.rotation.x = -Math.PI / 2;
//   plane.position.y = -3;
//   plane.receiveShadow = true;
//   scene.add(plane);

//   // Mouse movement
//   canvas.addEventListener('mousemove', onMouseMove);
//   canvas.addEventListener('touchmove', onTouchMove);

//   // Window resize
//   window.addEventListener('resize', onWindowResize);

//   // Animation loop
//   animate();
// }

// function createTShirt() {
//   // Create a detailed T-shirt mesh
//   const group = new THREE.Group();

//   // Body
//   const bodyGeometry = new THREE.BoxGeometry(3, 4, 0.3);
//   const bodyMaterial = new THREE.MeshStandardMaterial({
//     color: 0x1a1a28,
//     roughness: 0.3,
//     metalness: 0.7,
//     emissive: 0x00f0ff,
//     emissiveIntensity: 0.2
//   });
//   const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
//   body.castShadow = true;
//   group.add(body);

//   // Sleeves
//   const sleeveGeometry = new THREE.BoxGeometry(1.2, 1.2, 0.3);
//   const sleeveMaterial = bodyMaterial.clone();
  
//   const leftSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
//   leftSleeve.position.set(-2, 1.2, 0);
//   leftSleeve.castShadow = true;
//   group.add(leftSleeve);

//   const rightSleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
//   rightSleeve.position.set(2, 1.2, 0);
//   rightSleeve.castShadow = true;
//   group.add(rightSleeve);

//   // Collar
//   const collarGeometry = new THREE.CylinderGeometry(0.6, 0.7, 0.4, 16);
//   const collarMaterial = new THREE.MeshStandardMaterial({
//     color: 0x00f0ff,
//     roughness: 0.2,
//     metalness: 0.8,
//     emissive: 0x00f0ff,
//     emissiveIntensity: 0.5
//   });
//   const collar = new THREE.Mesh(collarGeometry, collarMaterial);
//   collar.position.y = 2.2;
//   collar.castShadow = true;
//   group.add(collar);

//   // Add design elements - neon lines
//   const lineMaterial = new THREE.LineBasicMaterial({
//     color: 0x00f0ff,
//     linewidth: 2
//   });

//   // Vertical line
//   const verticalPoints = [
//     new THREE.Vector3(0, 1.5, 0.16),
//     new THREE.Vector3(0, -1.5, 0.16)
//   ];
//   const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
//   const verticalLine = new THREE.Line(verticalGeometry, lineMaterial);
//   group.add(verticalLine);

//   // Horizontal line
//   const horizontalPoints = [
//     new THREE.Vector3(-1.2, 0, 0.16),
//     new THREE.Vector3(1.2, 0, 0.16)
//   ];
//   const horizontalGeometry = new THREE.BufferGeometry().setFromPoints(horizontalPoints);
//   const horizontalLine = new THREE.Line(horizontalGeometry, lineMaterial);
//   group.add(horizontalLine);

//   // Add glow sphere
//   const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
//   const glowMaterial = new THREE.MeshBasicMaterial({
//     color: 0x00f0ff,
//     transparent: true,
//     opacity: 0.8
//   });
//   const glow = new THREE.Mesh(glowGeometry, glowMaterial);
//   glow.position.set(0, 0, 0.2);
//   group.add(glow);

//   // Add outer glow ring
//   const ringGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 100);
//   const ringMaterial = new THREE.MeshBasicMaterial({
//     color: 0x7000ff,
//     transparent: true,
//     opacity: 0.6
//   });
//   const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//   ring.position.z = 0.2;
//   group.add(ring);

//   tshirt = group;
//   scene.add(tshirt);
// }

// function createParticles() {
//   const particlesGeometry = new THREE.BufferGeometry();
//   const particleCount = 500;
//   const positions = new Float32Array(particleCount * 3);
//   const colors = new Float32Array(particleCount * 3);

//   const color1 = new THREE.Color(0x00f0ff);
//   const color2 = new THREE.Color(0x7000ff);
//   const color3 = new THREE.Color(0xff006e);

//   for (let i = 0; i < particleCount * 3; i += 3) {
//     positions[i] = (Math.random() - 0.5) * 20;
//     positions[i + 1] = (Math.random() - 0.5) * 20;
//     positions[i + 2] = (Math.random() - 0.5) * 20;

//     const colorChoice = Math.random();
//     const color = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
//     colors[i] = color.r;
//     colors[i + 1] = color.g;
//     colors[i + 2] = color.b;
//   }

//   particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//   particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//   const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.1,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.6,
//     blending: THREE.AdditiveBlending
//   });

//   particles = new THREE.Points(particlesGeometry, particlesMaterial);
//   scene.add(particles);
// }

// function onMouseMove(event) {
//   const canvas = document.getElementById('threejs-canvas');
//   const rect = canvas.getBoundingClientRect();
//   mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
//   mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
//   targetRotation.x = mouse.y * 0.5;
//   targetRotation.y = mouse.x * 0.5;
// }

// function onTouchMove(event) {
//   if (event.touches.length > 0) {
//     const canvas = document.getElementById('threejs-canvas');
//     const rect = canvas.getBoundingClientRect();
//     mouse.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
//     mouse.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
    
//     targetRotation.x = mouse.y * 0.5;
//     targetRotation.y = mouse.x * 0.5;
//   }
// }

// function onWindowResize() {
//   const canvas = document.getElementById('threejs-canvas');
//   if (!canvas) return;

//   camera.aspect = canvas.clientWidth / canvas.clientHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(canvas.clientWidth, canvas.clientHeight);
// }

// function animate() {
//   requestAnimationFrame(animate);

//   if (tshirt) {
//     // Smooth rotation following mouse
//     currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
//     currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
    
//     tshirt.rotation.x = currentRotation.x;
//     tshirt.rotation.y = currentRotation.y + Date.now() * 0.0001;
    
//     // Floating animation
//     tshirt.position.y = Math.sin(Date.now() * 0.001) * 0.3;
    
//     // Pulse the glow
//     const glowMesh = tshirt.children.find(child => child.geometry?.type === 'SphereGeometry');
//     if (glowMesh) {
//       glowMesh.material.opacity = 0.6 + Math.sin(Date.now() * 0.002) * 0.2;
//       glowMesh.rotation.z += 0.01;
//     }
    
//     // Rotate the ring
//     const ringMesh = tshirt.children.find(child => child.geometry?.type === 'TorusGeometry');
//     if (ringMesh) {
//       ringMesh.rotation.z += 0.005;
//     }
//   }

//   if (particles) {
//     particles.rotation.y += 0.0002;
//     particles.rotation.x += 0.0001;
//   }

//   renderer.render(scene, camera);
// }

// // Initialize when DOM is ready
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', initThreeJS);
// } else {
//   initThreeJS();
// }

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const container = document.getElementById('canvas-container');

// if (container) {
//     // 1. Scene
//     const scene = new THREE.Scene();

//     // 2. Camera
//     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
//     camera.position.z = 5;

//     // 3. Renderer
//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     container.appendChild(renderer.domElement);

//     // 4. Object: Abstract Fashion Form (Knot)
//     // Using a TorusKnot to simulate complex fabric weaving
//     const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 150, 20);
    
//     // Premium Wireframe Material
//     const material = new THREE.MeshPhongMaterial({ 
//         color: 0x2563EB,    // Base Blue
//         emissive: 0x051025, // Deep glow
//         specular: 0x38BDF8, // Cyan highlights
//         shininess: 100,
//         wireframe: true,
//         transparent: true,
//         opacity: 0.8
//     });

//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // 5. Particles System (Atmosphere)
//     const particlesGeo = new THREE.BufferGeometry();
//     const particlesCount = 1000;
//     const posArray = new Float32Array(particlesCount * 3);

//     for(let i = 0; i < particlesCount * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * 15; // Spread particles
//     }

//     particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     const particlesMat = new THREE.PointsMaterial({
//         size: 0.02,
//         color: 0x38BDF8,
//         transparent: true,
//         opacity: 0.6
//     });

//     const particles = new THREE.Points(particlesGeo, particlesMat);
//     scene.add(particles);

//     // 6. Lights
//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(5, 5, 5);
//     scene.add(pointLight);

//     const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
//     scene.add(ambientLight);

//     // 7. Interaction
//     let mouseX = 0;
//     let mouseY = 0;

//     document.addEventListener('mousemove', (event) => {
//         mouseX = (event.clientX / window.innerWidth) - 0.5;
//         mouseY = (event.clientY / window.innerHeight) - 0.5;
//     });

//     // 8. Animation Loop
//     const animate = () => {
//         requestAnimationFrame(animate);

//         // Auto Rotation
//         mesh.rotation.x += 0.002;
//         mesh.rotation.y += 0.005;

//         // Mouse Parallax Interaction
//         mesh.rotation.x += mouseY * 0.05;
//         mesh.rotation.y += mouseX * 0.05;
        
//         // Particles drift
//         particles.rotation.y -= 0.001;

//         renderer.render(scene, camera);
//     };

//     animate();

//     // 9. Resize Handling
//     window.addEventListener('resize', () => {
//         camera.aspect = container.clientWidth / container.clientHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(container.clientWidth, container.clientHeight);
//     });
// }


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ============================================
// THREE.JS ABSTRACT 3D HERO (UPDATED)
// Uses SAME IDs & STRUCTURE as old T-shirt code
// ============================================

let scene, camera, renderer, mesh, particles;
let mouse = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

function initThreeJS() {
  const canvas = document.getElementById("threejs-canvas");
  if (!canvas) return;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05050a, 10, 50);

  // Camera
  camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 6;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const keyLight = new THREE.PointLight(0x38bdf8, 1.5);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x7c3aed, 1);
  rimLight.position.set(-5, 3, -5);
  scene.add(rimLight);

  // Create Main Object
  createAbstractMesh();

  // Particles
  createParticles();

  // Events
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove", onTouchMove);
  window.addEventListener("resize", onResize);

  animate();
}

function createAbstractMesh() {
  const geometry = new THREE.TorusKnotGeometry(1.2, 0.45, 180, 24);

  const material = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    emissive: 0x051025,
    metalness: 0.8,
    roughness: 0.2,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function createParticles() {
  const count = 900;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.6
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function onMouseMove(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  targetRotation.x = mouse.y * 0.6;
  targetRotation.y = mouse.x * 0.6;
}

function onTouchMove(e) {
  if (!e.touches.length) return;
  const rect = renderer.domElement.getBoundingClientRect();

  mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;

  targetRotation.x = mouse.y * 0.6;
  targetRotation.y = mouse.x * 0.6;
}

function onResize() {
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

  if (mesh) {
    mesh.rotation.x = currentRotation.x + Date.now() * 0.0002;
    mesh.rotation.y = currentRotation.y + Date.now() * 0.0003;
  }

  if (particles) {
    particles.rotation.y += 0.0006;
  }

  renderer.render(scene, camera);
}

// Init
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initThreeJS)
  : initThreeJS();


// ------------------------------------------------------------------------------------------------------------------

