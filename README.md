## A-Frame Proxemics Interactions component

[![Version](http://img.shields.io/npm/v/aframe-proxemic-component.svg?style=flat-square)](https://npmjs.org/package/aframe-proxemic-component)
[![License](http://img.shields.io/npm/l/aframe-proxemic-component.svg?style=flat-square)](https://npmjs.org/package/aframe-proxemic-component)

A Proxemic Interactions component for A-Frame.

For [A-Frame](https://aframe.io).

### proximity-sensor

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| distance |  Distance, in meters, to the target object which will trigger the sensor.          |     1          |
| target | Selector to identify the target object. By default the proximity sensor will trigger in response to the camera object. | [camera] |
| hidden | Whether to trigger events on hidden entities | false |

#### Events
| Event | Description | 
| -------- | ----------- |
| proximityenter |  Triggered when the distance between this entity and the target entity transitions between being above to being below the distance property value.| 
| proximityexit |  Triggered when the distance between this entity and the target entity transitions between being below to being above the distance property value.|

#### Example
```html 
<a-scene environment="preset: forest">
    <a-sphere proximity-sensor="target:#two; distance: 1"
           radius="0.25" id="one" side="both" color="green" position="-2 1.6 -4"
           animation="property:position; from: -2 1.6 -4; to: 2 1.6 -4; dur: 5000; dir: alternate; loop: true"
           event-set__proximityenter="material.color: red"
           event-set__proximityexit="material.color: green"
    ></a-sphere>

    <a-box proximity-sensor="target:#one; distance: 2"
           width="0.5" height="0.5" depth="0.5" id="two" side="both" color="green" position="2 1.6 -4"
           animation="property:position; from: 2 1.6 -4; to: -2 1.6 -4; dur: 5000; dir: alternate; loop: true"
           event-set__proximityenter="material.color:blue"
           event-set__proximityexit="material.color: green"
    ></a-box>
</a-scene>
```

Additional examples:

* [Proximity to camera](examples/proximity-sensor/proximitytocamera.html)
* [Proximity to object](examples/proximity-sensor/proximitytoobject.html)
### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.6.0/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-proxemic-component/dist/aframe-proxemic-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity proximity-sensor></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-proxemic-component
```

Then require and use.

```js
require('aframe');
require('aframe-proxemic-component');
```
=======


