export default class UiObjects {
  constructor(camera) {
    this.createObjects(camera)
  }
  
  createObjects(camera) {
    var uiGroup = new THREE.Group();
    var redGeom = new THREE.BoxGeometry(100, 100, 100);
    var redMate = new THREE.MeshBasicMaterial({ color: 0xff00, side: THREE.DoubleSide });
    var redBox = new THREE.Mesh(redGeom, redMate);

    var geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    uiGroup.add(plane)
    uiGroup.add(redBox)
    // uiGroup.position.z = -3000
    uiGroup.position.z = -camera.near
    let height = this.visibleHeightAtZ(plane.position.z, camera)
    console.log(window.innerWidth)
    console.log(height)
    uiGroup.scale.set(this.visibleWidthAtZ(plane.position.z, camera, height) / window.innerWidth, height / window.innerHeight, 1);
    camera.add(uiGroup);
  }

  onUpdate(time, raycaster, camera) {
    // console.log(this.plane.position)
    // console.log(camera.position)
    // this.plane.position.copy(camera.position);
    // this.plane.rotation.copy(camera.rotation);
    // this.plane.translateZ(- 1000);
    // this.plane.translateZ(- 1183);
  }

  visibleHeightAtZ(z, camera) {
    const cameraOffset = camera.position.z;
    if (z < cameraOffset) z -= cameraOffset;
    else z += cameraOffset;

    // vertical fov in radians
    const vFOV = camera.fov * Math.PI / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(z);
  }

  visibleWidthAtZ(z, camera, height) {
    if (height) return height * camera.aspect;
    return visibleHeightAtZDepth(z, camera) * camera.aspect;
  }
}