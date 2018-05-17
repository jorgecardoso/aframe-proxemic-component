/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
console.log("A-Frame Proxemic Component");

import  "./src/proximity-sensor.js";
import "./src/compass-sensor.js";