/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log('A-Frame Proxemic Components Version: 0.0.16 (Date 2020-03-22, Commit #2c99f18)');

require("./src/proximity-sensor.js")
require( "./src/compass-sensor.js")