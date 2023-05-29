<!-- to vitualize the ray direction -->

const rayGeometry = new THREE.BufferGeometry().setFromPoints([rayOrigin, rayOrigin.clone().add(rayDirection)]);
const rayMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color

const rayLine = new THREE.Line(rayGeometry, rayMaterial);
scene.add(rayLine);
