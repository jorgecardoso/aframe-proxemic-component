/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log('A-Frame Proxemic Components Version: 0.0.19 (Date 2021-07-21, Commit #76fd28e)');

require("./src/proximity-sensor.js")
require( "./src/compass-sensor.js")