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
    let canvasTexture = new THREE.Texture(canvas);
    canvasTexture.needsUpdate = true;
    canvasTexture.minFilter = THREE.LinearFilter;
    var spriteMaterial = new THREE.SpriteMaterial({ map: canvasTexture });
    this.sprite = new THREE.Sprite(spriteMaterial);
    this.sprite.scale.set(canvas.width / devicePixelRatio, canvas.height / devicePixelRatio, 1);
    this.sprite.center.set( .5, .5)
    this.sprite.position.set(0, 0, 0)
    this.canvas = canvas;
  }

  getGeometry() {
    return this.sprite
  }

  getWidth() {
    return this.canvas.width;
  }

  getHeight() {
    return this.canvas.height;
  }
}