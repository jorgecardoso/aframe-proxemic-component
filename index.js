/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log('A-Frame Proxemic Components Version: 0.0.21 (Date 2022-04-01, Commit #822e6cd)');

require("./src/proximity-sensor.js")
require( "./src/compass-sensor.js")