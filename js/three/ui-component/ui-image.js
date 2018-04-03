export default class UiImage {
  constructor(props) {
    let loader = new THREE.TextureLoader();
    let texture = loader.load(props.image, loadedTexture => {
      sprite.scale.set(loadedTexture.image.width / 1.5, loadedTexture.image.height / 1.5, 1)
      sprite.position.set(10, 10, 0);
    });
    texture.minFilter = THREE.LinearFilter;
    let sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
    sprite.center.set(.5, .5)
    this.sprite = sprite;
  }

  getGeometry() {
    return this.sprite;
  }
}