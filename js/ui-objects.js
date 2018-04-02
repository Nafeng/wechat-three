export default class UiObjects {
  constructor(scene) {
    this.createObjects(scene)
  }
  
  createObjects(scene) {
    var uiGroup = new THREE.Group();
    var redGeom = new THREE.BoxGeometry(100, window.innerHeight, 2);
    var redMate = new THREE.MeshBasicMaterial({ color: 0xff00, side: THREE.DoubleSide });
    var redBox = new THREE.Mesh(redGeom, redMate);

    uiGroup.add(redBox)

    var textureLoader = new THREE.TextureLoader();
    var materialC = new THREE.SpriteMaterial({ map: textureLoader.load("textures/crate.gif"), color: 0xffffff, fog: true });
    var spriteC = new THREE.Sprite(materialC);
    spriteC.center.set(0.5, 0.5);
    spriteC.scale.set(window.innerWidth, 100, 1)
    uiGroup.add(spriteC);
    scene.add(uiGroup);
  }

  onUpdate(time, rayCaster, camera) {
  }
}