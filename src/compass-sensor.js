/**
 * Proxemic Interactions component for A-Frame.
 */

const EVENT_NAME_ENTER = 'compass-sensor-enter';
const EVENT_NAME_LEAVE = 'compass-sensor-leave';

AFRAME.registerComponent('compass-sensor', {
    schema: {
        xRotMin: {type: 'number', default: -Infinity},
        yRotMin: {type: 'number', default: -Infinity},
        zRotMin: {type: 'number', default: -Infinity},
        xRotMax: {type: 'number', default: Infinity},
        yRotMax: {type: 'number', default: Infinity},
        zRotMax: {type: 'number', default: Infinity},
    },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: true,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
    },
    tick: function () {

        //var thisRot = this.el.object3D.rotation;
        var xDeg = THREE.Math.radToDeg(this.el.object3D.rotation.x) % 360;
        xDeg = xDeg < 0 ? 360 + xDeg : xDeg;
        var yDeg = THREE.Math.radToDeg(this.el.object3D.rotation.y) % 360;
        yDeg = yDeg < 0 ? 360 + yDeg : yDeg;
        var zDeg = THREE.Math.radToDeg(this.el.object3D.rotation.z) % 360;
        zDeg = zDeg < 0 ? 360 + zDeg : zDeg;

        /*
        if (!this.lastRot.equals(this.el.object3D.rotation)) {
            console.log(xDeg, yDeg, zDeg);
        }
        this.lastRot.copy(this.el.object3D.rotation);
        */
        if (!this.triggered
            && xDeg >= this.data.xRotMin && xDeg <= this.data.xRotMax
            && yDeg >= this.data.yRotMin && yDeg <= this.data.yRotMax
            && zDeg >= this.data.zRotMin && zDeg <= this.data.zRotMax) {


            this.el.emit(this.eventEnter);
            console.log('Compass enter: ' + this.eventEnter);
            this.triggered = true;

        } else if (this.triggered
            && (xDeg < this.data.xRotMin || xDeg > this.data.xRotMax
                || yDeg < this.data.yRotMin || yDeg > this.data.yRotMax
                || zDeg < this.data.zRotMin || zDeg > this.data.zRotMax)) {

            this.el.emit(this.eventLeave);
            console.log('Compass leave: ' + this.eventLeave);
            this.triggered = false;
        }
    },
    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) {
        this.lastRot = new THREE.Vector3();

        this.triggered = false;

        if (Math.abs(this.data.xRotMin) !== Infinity) {
            this.data.xRotMin %= 360;
            this.data.xRotMin = this.data.xRotMin < 0 ? 360 + this.data.xRotMin : this.data.xRotMin;
        }

        if (Math.abs(this.data.yRotMin) !== Infinity) {
            this.data.yRotMin %= 360;
            this.data.yRotMin = this.data.yRotMin < 0 ? 360 + this.data.yRotMin : this.data.yRotMin;
        }

        if (Math.abs(this.data.zRotMin) !== Infinity) {
            this.data.zRotMin %= 360;
            this.data.zRotMin = this.data.zRotMin < 0 ? 360 + this.data.zRotMin : this.data.zRotMin;
        }

        if (Math.abs(this.data.xRotMax) !== Infinity) {
            this.data.xRotMax %= 360;
            this.data.xRotMax = this.data.xRotMax < 0 ? 360 + this.data.xRotMax : this.data.xRotMax;
        }

        if (Math.abs(this.data.yRotMax) !== Infinity) {
            this.data.yRotMax %= 360;
            this.data.yRotMax = this.data.yRotMax < 0 ? 360 + this.data.yRotMax : this.data.yRotMax;
        }

        if (Math.abs(this.data.zRotMax) !== Infinity) {
            this.data.zRotMax %= 360;
            this.data.zRotMax = this.data.zRotMax < 0 ? (360 + this.data.zRotMax) : this.data.zRotMax;
        }

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
            this.eventEnter = EVENT_NAME_ENTER + '-' + this.id;
            this.eventLeave = EVENT_NAME_LEAVE + '-' + this.id;
        } else {
            this.eventEnter = EVENT_NAME_ENTER;
            this.eventLeave = EVENT_NAME_LEAVE;
        }

       // console.log(this.data);
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function () {
    },

    /**
     * Called on each scene tick.
     */
    // tick: function (t) { },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause: function () {
    },

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play: function () {
    }
});
