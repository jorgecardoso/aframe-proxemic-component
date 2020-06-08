/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log('A-Frame Proxemic Components Version: 0.0.17 (Date 2020-06-08, Commit #f15bf63)');

require("./src/proximity-sensor.js")
require( "./src/compass-sensor.js")