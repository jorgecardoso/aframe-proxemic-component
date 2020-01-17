/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('proximity-sensor component', function () {
  var component;
  var el;
  var camera;
  var abox;
  var target;

  setup(function (done) {
    el = entityFactory();
    abox = document.createElement("a-box");
    abox.setAttribute("position", "0 1.6 -3");
    target = document.createElement("a-entity");
    abox.appendChild(target);
    el.sceneEl.appendChild(abox);

    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'proximity-sensor') { return; }
      component = el.components['proximity-sensor'];
      camera = document.querySelector("[camera]");
      done();
    });
    el.setAttribute('proximity-sensor', {});
  });

  suite('defaults', function () {
    test('default target', function () {
      assert.equal(camera, component._target);
    });

    test('default distance', function () {
      assert.equal(component.data.distance, 1);
    });

    test('updates target', function () {
      el.setAttribute('proximity-sensor', "target: a-box");
      component.tick(1, 1);
      assert.equal(component._target, el.sceneEl.querySelector("a-box"));
    });


    test('gets correct camera pos', function () {
      assert.equal(component.getWorldPosition(camera.object3D, component._targetPos).x, 0);
      assert.equal(component.getWorldPosition(camera.object3D, component._targetPos).y, 1.6);
      assert.equal(component.getWorldPosition(camera.object3D, component._targetPos).z, 0);
    });
    test('gets correct box pos', function () {
      assert.equal(component.getWorldPosition(abox.object3D, component._targetPos).x, 0);
      assert.equal(component.getWorldPosition(abox.object3D, component._targetPos).y, 1.6);
      assert.equal(component.getWorldPosition(abox.object3D, component._targetPos).z, -3);
    });
    test('gets correct box>entity pos', function () {
      let target = el.sceneEl.querySelector("a-box>a-entity");
      assert.equal(component.getWorldPosition(target.object3D, component._targetPos).x, 0);
      assert.equal(component.getWorldPosition(target.object3D, component._targetPos).y, 1.6);
      assert.equal(component.getWorldPosition(target.object3D, component._targetPos).z, -3);
    });
  });

  suite('enter event on camera', function () {
    test('emits enter event', function (done) {
      component.el.addEventListener("proximityenter", function() {
        done();
      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
    });

    test('emits enter event on camera once', function (done) {
      let count = 0;
      component.el.addEventListener("proximityenter", function() {
        count++;
      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
      component.tick(1000, 15);
      assert.equal(count, 1);
      done();
    });

    test('emits enter event on a-box content', function (done) {
      el.setAttribute('proximity-sensor', "target: a-box>a-entity");
      component.el.addEventListener("proximityenter", function() {
        done();
      });
      component.el.setAttribute("position", "0 1.6 -3");
      component.tick(1, 1);
    });
  });

  suite('exit event', function () {

    test('emits exit event', function (done) {
      component.el.addEventListener("proximityenter", function() {
        component.el.addEventListener("proximityexit", function() {
          done();
        });
        component.el.setAttribute("position", "1000, 1000, 1000");
        component.tick(1000, 100);

      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
    });

    test('emits exit event once', function (done) {
      let count = 0;
      component.el.addEventListener("proximityenter", function() {
        component.el.addEventListener("proximityexit", function() {
          count++;
        });
        component.el.setAttribute("position", "1000, 1000, 1000");
        component.tick(1000, 100);
        component.el.setAttribute("position", "2001, 2000, 2000");
        component.tick(2000, 100);
        assert.equal(count, 1);
        done();
      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
    });
  });
});
