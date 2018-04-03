import UiText from './three/ui-component/ui-text.js'
import UiButton from "./three/ui-component/ui-button";
import UiImage from "./three/ui-component/ui-image";
export default class UiObjects {
  constructor(scene) {
    this.createObjects(scene)
  }
  
  createObjects(scene) {
    var uiGroup = new THREE.Group();
    let text = new UiText({
      text: 'Text Node Text',
      fontSize: 18,
      color: 'black'
    })
    uiGroup.add(text.getGeometry())
  
    let image = new UiImage({
      image: 'textures/button.png',
    });

    uiGroup.add(image.getGeometry());

    scene.add(uiGroup);
  }

  onUpdate(time, rayCaster, camera) {
  }
}