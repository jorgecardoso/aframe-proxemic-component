
/**
 * Proxemic Interactions component for A-Frame.
 */
AFRAME.registerComponent('proximity-sensor', {
    schema: {
        distance: {type:'number', default: 1, min: 0},
        target: {type:'selector', default: '[camera]'},
        hidden: {type:'boolean', default: false}
        },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        this.el.sceneEl.addBehavior(this);
        this._triggered = false;
        this._targetPos = new THREE.Vector3( );
        this._thisPos = new THREE.Vector3( );
        console.info("A-Frame Proximity Sensor.");
    },
    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) {
        this._triggered = false;
        this._target = this.data.target;
        console.log("Detecting proximity (distance threshold: ",
            this.data.distance, ") between ", this.el, " and ", this.data.target);
    },
    tick: function() {
        let isVisible = true;
        // Honor the hidden flag so that events are not triggered on not visible entities
        if (this.data.hidden === false) {
            let ent = this.el;
            //console.log(this.el.sceneEl);
            while (ent != this.el.sceneEl) {
                if (ent.object3D.visible === false) isVisible = false;
                ent = ent.parentEl;
            }
        }

        this._targetPos = this.getWorldPosition(this._target.object3D, this._targetPos);
        this._thisPos = this.getWorldPosition(this.el.object3D, this._thisPos);

        if (isVisible && !this._triggered && this._thisPos.distanceTo(this._targetPos) < this.data.distance) {
            this._triggered = true;
            console.debug('Emitting "proximityenter" event');
            this.el.emit('proximityenter');
        } else if (isVisible && this._triggered && this._thisPos.distanceTo(this._targetPos) >= this.data.distance) {
            this._triggered = false;
            console.debug('Emitting "proximityexit" event');
            this.el.emit('proximityexit');

        }
    },


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
    play: function () { },

    getWorldPosition: function(object3D, vec3) {
        object3D.updateWorldMatrix(true);
        vec3.setFromMatrixPosition(object3D.matrixWorld);
        return vec3;
    }
});
