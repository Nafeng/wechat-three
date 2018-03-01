import "./libs/weapp-adapter.js"
document.createElementNS = function (ns, tagName) {
  return document.createElement(tagName)
}