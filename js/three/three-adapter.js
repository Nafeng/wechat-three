import "../libs/weapp-adapter.js"
document.createElementNS = function (ns, tagName) {
  return document.createElement(tagName)
}
GameGlobal.THREE = require('./three.js')
GameGlobal.OrbitControls = require( "./controls/OrbitControls.js")