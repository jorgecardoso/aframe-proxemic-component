
/**
 * Proxemic Interactions component for A-Frame.
 */
AFRAME.registerComponent('lookat-sensor', {
    schema: {
        xRotMin: {default: -1},
        yRotMin: {default: -1},
        zRotMin: {default: -1},
        xRotMax: {default: 361},
        yRotMax: {default: 361},
        zRotMax: {default: 361},
        },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        //console.log("LookAt Sensor Initialized on ", this.el);
        this.triggered = false;
        //this.el.sceneEl.addBehavior(this);
        //this.directionVec3 = new THREE.Vector3();
    },
    tick: function() {

        //var thisRot = this.el.object3D.rotation;
        var xDeg = THREE.Math.radToDeg( this.el.object3D.rotation.x )%360;
        var yDeg = THREE.Math.radToDeg( this.el.object3D.rotation.y )%360;
        var zDeg = THREE.Math.radToDeg( this.el.object3D.rotation.z )%360;

       // console.log(xDeg, yDeg, zDeg);
        if (!this.triggered
            && xDeg > this.data.xRotMin && xDeg < this.data.xRotMax
            && yDeg > this.data.yRotMin && yDeg < this.data.yRotMax
            && zDeg > this.data.zRotMin && zDeg < this.data.zRotMax ) {
            this.el.emit('lookat-sensor-enter');
            console.log('Player looked ');
            this.triggered = true;
        } else if (this.triggered
            && (xDeg < this.data.xRotMin || xDeg > this.data.xRotMax
            || yDeg < this.data.yRotMin || yDeg > this.data.yRotMax
            || zDeg < this.data.zRotMin || zDeg > this.data.zRotMax) ){

            this.el.emit('lookat-sensor-leave');
            console.log('Player looked away');
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
