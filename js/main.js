import "./three/three-adapter.js"
import GameObjects from "game-objects"
import UiObjects from "ui-objects"


export default class Main {
  camera;
  scene;
  renderer;
  rayCaster;
  touch;

  uiCamera;
  uiScene;

  constructor() {
    wx.onTouchStart(event => this.onTouchStart(event))
    wx.onTouchMove(event => this.onTouchMove(event))
    wx.onTouchEnd(event => this.onTouchEnd(event))
    wx.onTouchCancel(event => this.onTouchCancel(event))
    this.init();
    this.initUiScene();
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
    //
    this.rayCaster = new THREE.Raycaster();
    //
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    let controls = new THREE.OrbitControls(this.camera);
  }

  initUiScene() {
    var width = window.innerWidth;
    let height = window.innerHeight;
    this.uiCamera = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 10 );
    this.uiCamera.position.z = 1;
    this.uiScene = new THREE.Scene();
    this.uiObjects = new UiObjects(this.uiScene);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    let { touch, camera, rayCaster, scene, gameObjects, uiObjects, renderer, uiScene, uiCamera} = this
    var time = Date.now() * 0.001;
    touch && rayCaster.setFromCamera(touch, this.camera);
    gameObjects.onUpdate(time, touch ? rayCaster : undefined)
    uiObjects && uiObjects.onUpdate(time, touch ? rayCaster : undefined, this.camera)
    renderer.clear();
    renderer.render(scene, camera);
    renderer.render(uiScene, uiCamera);
  }

}