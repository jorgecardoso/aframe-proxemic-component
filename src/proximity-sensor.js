
/**
 * Proxemic Interactions component for A-Frame.
 */
AFRAME.registerComponent('proximity-sensor', {
    schema: {
        distance: {type:'number', default: 1, min: 0},
        target: {type:'selector', default: '[camera],a-camera'},
        hidden: {type:'boolean', default: false}
        },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: true,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        let _this = this;
        this.el.sceneEl.addBehavior(this);
        this._triggered = false;
        this._targetPos = new THREE.Vector3( );
        this._thisPos = new THREE.Vector3( );
        console.info("A-Frame Proximity Sensor.");

        let scene = this.el.sceneEl;
        this._hasStats = false;
        if (scene.hasLoaded) {
            run();
        } else {
            scene.addEventListener('loaded', run);
        }

        function run () {
            console.log(scene.hasAttribute('stats'))
            if (scene.hasAttribute('stats')) {
                _this._hasStats = true;

                // this._statsPanel = document.querySelector
            }
        }

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
        if (this._hasStats) {
            if (!this._statsPanel) {
                this._statsPanel = document.querySelector(".rs-base");
                let statsPanelContainer = this._statsPanel.querySelector(".rs-container");

                let title = document.createElement("h1")
                title.innerText = "Proxemics";
                statsPanelContainer.appendChild(title);

                let container = document.createElement("div");
                container.classList.add("rs-group");
                let counterBasePosition = document.createElement("div");
                counterBasePosition.classList.add("rs-counter-base");
                counterBasePosition.innerHTML = '<span class="rs-counter-id">Distance (' + (this.el.id?this.el.id:'') +') </span>';
                this._containerPosition = document.createElement("div");
                this._containerPosition.classList.add("rs-counter-value");
                this._containerPosition.style = "width: 200px";
                counterBasePosition.appendChild(this._containerPosition);
                container.appendChild(counterBasePosition);

                statsPanelContainer.appendChild(container);
                console.log(this._statsPanel)
            }
        }

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

        let d = this._thisPos.distanceTo(this._targetPos);
        this._containerPosition.innerText = `${d}`

        if (isVisible && !this._triggered && this._thisPos.distanceTo(this._targetPos) < this.data.distance) {
            this._triggered = true;
            console.debug('Emitting "proximityenter" event');
            this.el.emit('proximityenter', {componentId: this.id});
        } else if (isVisible && this._triggered && this._thisPos.distanceTo(this._targetPos) >= this.data.distance) {
            this._triggered = false;
            console.debug('Emitting "proximityexit" event');
            this.el.emit('proximityexit', {componentId: this.id});

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
