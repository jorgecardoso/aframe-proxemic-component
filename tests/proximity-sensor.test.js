/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('proximity-sensor component', function () {
  var component;
  var el;
  var camera;

  setup(function (done) {
    el = entityFactory();
    camera = document.createElement("a-camera");
    el.sceneEl.appendChild(camera);
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'proximity-sensor') { return; }
      component = el.components['proximity-sensor'];
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
  });

  suite('enter event', function () {
    test('emits enter event', function (done) {
      component.el.addEventListener("enter", function() {
        done();
      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
    });

    test('emits enter event once', function (done) {
      let count = 0;
      component.el.addEventListener("enter", function() {
        count++;
      });
      component.el.setAttribute("position", camera.getAttribute("position"));
      component.tick(1, 1);
      component.tick(1000, 15);
      assert.equal(count, 1);
      done();
    });
  });

  suite('enter event', function () {

    test('emits exit event', function (done) {
      component.el.addEventListener("enter", function() {
        component.el.addEventListener("exit", function() {
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
      component.el.addEventListener("enter", function() {
        component.el.addEventListener("exit", function() {
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
