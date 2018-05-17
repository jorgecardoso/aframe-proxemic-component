(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    /**
     * Proxemic Interactions component for A-Frame.
     */
    AFRAME.registerComponent('proximity-sensor', {
        schema: {
            distance: {default: 1, min: 0},
            target: {default: 'a-camera'}
            },

        /**
         * Set if component needs multiple instancing.
         */
        multiple: false,

        /**
         * Called once when component is attached. Generally for initial setup.
         */
        init: function () {
            this.triggered = false;
            this.el.sceneEl.addBehavior(this);
            console.log("Proximity Sensor.");
        },
        tick: function() {
            var target = this.el.sceneEl.querySelector(this.data.target);
            var targetPos = target.object3D.position;
            //console.log(targetPos);
            var thisPos = this.el.object3D.position;
            if (!this.triggered && thisPos.distanceTo(targetPos) < this.data.distance) {
                this.triggered = true;
                this.el.emit('playerenter');
                console.log('Player entered checkpoint');
            } else if (this.triggered && thisPos.distanceTo(targetPos) >= this.data.distance) {
                this.triggered = false;
                this.el.emit('playerleave');
                console.log('Player left checkpoint');
            }
        },
        /**
         * Called when component is attached and when component data changes.
         * Generally modifies the entity based on the data.
         */
        update: function (oldData) { },

        /**
         * Called when a component is removed (e.g., via removeAttribute).
         * Generally undoes all modifications to the entity.
         */
        remove: function () { },

        /**
         * Called on each scene tick.
         */
        // tick: function (t) { },

        /**
         * Called when entity pauses.
         * Use to stop or remove any dynamic or background behavior such as events.
         */
        pause: function () { },

        /**
         * Called when entity resumes.
         * Use to continue or add any dynamic or background behavior such as events.
         */
        play: function () { }
    });

    /**
     * Proxemic Interactions component for A-Frame.
     */
    AFRAME.registerComponent('lookat-sensor', {
        schema: {
            xRotMin: {default: 0},
            yRotMin: {default: 0},
            zRotMin: {default: 0},
            xRotMax: {default: 359.99},
            yRotMax: {default: 359.99},
            zRotMax: {default: 359.99},
            },

        /**
         * Set if component needs multiple instancing.
         */
        multiple: true,

        /**
         * Called once when component is attached. Generally for initial setup.
         */
        init: function () {
            this.lastRot = new THREE.Vector3();
            
            this.triggered = false;
            this.data.xRotMin %= 360;
            this.data.xRotMin = this.data.xRotMin < 0 ? 360+this.data.xRotMin : this.data.xRotMin;

            this.data.yRotMin %= 360;
            this.data.yRotMin = this.data.yRotMin < 0 ? 360+this.data.yRotMin : this.data.yRotMin;

            this.data.zRotMin %= 360;
            this.data.zRotMin = this.data.zRotMin < 0 ? 360+this.data.zRotMin : this.data.zRotMin;


            this.data.xRotMax %= 360;
            this.data.xRotMax = this.data.xRotMax < 0 ? 360+this.data.xRotMax : this.data.xRotMax;

            this.data.yRotMax %= 360;
            this.data.yRotMax = this.data.yRotMax < 0 ? 360+this.data.yRotMax : this.data.yRotMax;

            this.data.zRotMax %= 360;
            this.data.zRotMax = this.data.zRotMax < 0 ? (360+this.data.zRotMax) : this.data.zRotMax;

            if (this.data.xRotMin > this.data.xRotMax) {
                let temp = this.data.xRotMin;
                this.data.xRotMin = this.data.xRotMax;
                this.data.xRotMax = temp;
            }
            if (this.data.yRotMin > this.data.yRotMax) {
                let temp = this.data.yRotMin;
                this.data.yRotMin = this.data.yRotMax;
                this.data.yRotMax = temp;
            }
            if (this.data.zRotMin > this.data.zRotMax) {
                let temp = this.data.zRotMin;
                this.data.zRotMin = this.data.zRotMax;
                this.data.zRotMax = temp;
            }

            if (this.id !== undefined) {
                this.eventEnter = 'lookat-sensor-enter__'+this.id;
                this.eventLeave = 'lookat-sensor-leave__'+this.id;
            } else {
                this.eventEnter = 'lookat-sensor-enter';
                this.eventLeave = 'lookat-sensor-leave';
            }

        },
        tick: function() {

            //var thisRot = this.el.object3D.rotation;
            var xDeg = THREE.Math.radToDeg( this.el.object3D.rotation.x ) % 360;
            xDeg = xDeg < 0 ? 360+xDeg : xDeg;
            var yDeg = THREE.Math.radToDeg( this.el.object3D.rotation.y ) % 360;
            yDeg = yDeg < 0 ? 360+yDeg : yDeg;
            var zDeg = THREE.Math.radToDeg( this.el.object3D.rotation.z ) % 360;
            zDeg = zDeg < 0 ? 360+zDeg : zDeg;

            /*
            if (!this.lastRot.equals(this.el.object3D.rotation)) {
                console.log(xDeg, yDeg, zDeg);
            }
            this.lastRot.copy(this.el.object3D.rotation);
            */
            if (!this.triggered
                && xDeg >= this.data.xRotMin && xDeg <= this.data.xRotMax
                && yDeg >= this.data.yRotMin && yDeg <= this.data.yRotMax
                && zDeg >= this.data.zRotMin && zDeg <= this.data.zRotMax ) {


                this.el.emit(this.eventEnter);
                console.log('Player looked: ' + this.eventEnter);
                this.triggered = true;

            } else if (this.triggered
                && (xDeg < this.data.xRotMin || xDeg > this.data.xRotMax
                || yDeg < this.data.yRotMin || yDeg > this.data.yRotMax
                || zDeg < this.data.zRotMin || zDeg > this.data.zRotMax) ){

                this.el.emit(this.eventLeave);
                console.log('Player looked away: ' + this.eventLeave);
                this.triggered = false;
            }
        },
        /**
         * Called when component is attached and when component data changes.
         * Generally modifies the entity based on the data.
         */
        update: function (oldData) { },

        /**
         * Called when a component is removed (e.g., via removeAttribute).
         * Generally undoes all modifications to the entity.
         */
        remove: function () { },

        /**
         * Called on each scene tick.
         */
        // tick: function (t) { },

        /**
         * Called when entity pauses.
         * Use to stop or remove any dynamic or background behavior such as events.
         */
        pause: function () { },

        /**
         * Called when entity resumes.
         * Use to continue or add any dynamic or background behavior such as events.
         */
        play: function () { }
    });

    /* global AFRAME */

    if (typeof AFRAME === 'undefined') {
      throw new Error('Component attempted to register before AFRAME was available.');
    }
    console.log("A-Frame Proxemic Component");

})));
