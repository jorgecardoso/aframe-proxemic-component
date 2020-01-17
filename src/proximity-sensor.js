
/**
 * Proxemic Interactions component for A-Frame.
 */
AFRAME.registerComponent('proximity-sensor', {
    schema: {
        distance: {type:'number', default: 1, min: 0},
        target: {type:'selector', default: '[camera]'}
        },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        this._triggered = false;
        this.el.sceneEl.addBehavior(this);
        this._target = this.data.target;

        //console.log(this.el.sceneEl.camera);

        console.info("A-Frame Proximity Sensor.");
        console.log("Detecting proximity (distance threshold: ", this.data.distance, ") between ", this.el, " and ", this.data.target);
    },
    tick: function() {
        //var target = this.el.sceneEl.querySelector(this.data.target);
        let targetPos = this._target.object3D.position;
        //console.log(targetPos);
        let thisPos = this.el.object3D.position;
        if (!this._triggered && thisPos.distanceTo(targetPos) < this.data.distance) {
            this._triggered = true;
            console.debug('Emitting "proximityenter" event');
            this.el.emit('proximityenter');
        } else if (this._triggered && thisPos.distanceTo(targetPos) >= this.data.distance) {
            this._triggered = false;
            console.debug('Emitting "proximityexit" event');
            this.el.emit('proximityexit');

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
