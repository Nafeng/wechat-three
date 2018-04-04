export default class UIText {
  constructor(props) {
    let visualFontHeight = props.fontSize * devicePixelRatio
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let font = `${props.fontStyle || ''} ${visualFontHeight}px ${props.fontFamily}`;
    context.font = font;
    canvas.width = props.width || context.measureText(props.text).width;
    canvas.height = props.height || wx.getTextLineHeight({
      text: props.text,
      fontSize: visualFontHeight,
      fontFamily: props.fontFamily
    });
    context.font = font;
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = props.color;
    context.textBaseline = 'top';
    context.fillText(props.text, 0, 0);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    let geometry = new THREE.PlaneGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
    this.plane = new THREE.Mesh( geometry, material );
    this.plane.scale.set(canvas.width / devicePixelRatio, canvas.height / devicePixelRatio, 1);
    this.plane.position.set(0, 0, 0.1)
    this.canvas = canvas;
  }

  getGeometry() {
    return this.plane
  }

  getWidth() {
    return this.canvas.width;
  }

  getHeight() {
    return this.canvas.height;
  }
}