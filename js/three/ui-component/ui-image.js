export default class UiImage {
  constructor(props) {
    let loader = new THREE.TextureLoader();
    let texture = loader.load(props.image, texture => {
      this.plane.scale.set(texture.image.width / devicePixelRatio, texture.image.height / devicePixelRatio, 1);
    });
    texture.minFilter = THREE.LinearFilter;
    let geometry = new THREE.PlaneGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
    let plane = new THREE.Mesh( geometry, material );
    plane.name = props.image
    this.plane = plane;
  }

  getGeometry() {
    return this.plane;
  }
}