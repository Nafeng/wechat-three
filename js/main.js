import "./three/three-adapter.js"
import GameObjects from "game-objects"
import UiObjects from "ui-objects"


export default class Main {
  camera;
  scene;
  renderer;
  raycaster;
  touch;

  constructor() {
    wx.onTouchStart(event => this.onTouchStart(event))
    wx.onTouchMove(event => this.onTouchMove(event))
    wx.onTouchEnd(event => this.onTouchEnd(event))
    wx.onTouchCancel(event => this.onTouchCancel(event))
    this.init();
    this.animate();
  }

  onTouchStart(event) {
    this.touch = new THREE.Vector2();
    let touch = event.touches[0]
    this.touch.x = (touch.clientX / window.innerWidth) * 2 - 1;
    this.touch.y = - (touch.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchMove(event) {
    this.touch = new THREE.Vector2();
    let touch = event.touches[0]
    this.touch.x = (touch.clientX / window.innerWidth) * 2 - 1;
    this.touch.y = - (touch.clientY / window.innerHeight) * 2 + 1;
  }

  onTouchEnd(event) {
    this.touch = undefined
  }

  onTouchCancel(event) {
    this.touch = undefined
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 500, 3000);
    this.camera.position.z = 2750;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050505);
    this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);
    this.scene.add(this.camera)
    //
    this.scene.add(new THREE.AmbientLight(0x444444));
    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);
    light1.position.set(1, 1, 1);
    this.scene.add(light1);
    var light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(0, -1, 0);
    this.scene.add(light2);
    this.gameObjects = new GameObjects(this.scene)
    this.uiObjects = new UiObjects(this.camera)
    //
    this.raycaster = new THREE.Raycaster();
    //
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    let controls = new THREE.OrbitControls(this.camera);
    //controls.update();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    let { touch, camera, raycaster, scene, gameObjects, uiObjects, renderer} = this
    var time = Date.now() * 0.001;
    touch && raycaster.setFromCamera(touch, this.camera);
    gameObjects.onUpdate(time, touch ? raycaster : undefined)
    uiObjects && uiObjects.onUpdate(time, touch ? raycaster : undefined, this.camera)
    renderer.render(scene, camera);
  }

}