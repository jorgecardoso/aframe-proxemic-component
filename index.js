/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log("A-Frame Proxemic Component v0.0.9");

require("./src/proximity-sensor.js")
require( "./src/compass-sensor.js")