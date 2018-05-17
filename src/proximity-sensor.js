
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
