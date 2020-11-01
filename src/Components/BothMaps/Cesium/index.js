import React, { Component } from "react";
import {
    Viewer,
    Scene,
    Globe,
    Clock,
    SkyBox,
    Entity ,
    Camera
} from 'resium';

import * as Cesium from 'cesium';

const terrainProvider = Cesium.createWorldTerrain({
    requestVertexNormals: true
});

export default class ExampleComponent extends Component {

    remove = (numberOfPendingTiles) => {
        if (numberOfPendingTiles === 0) {
            this.props.setGlobeScreenshot(this.viewer.canvas);
        }
    }

    saveCamera = () => {

        const camera = this.viewer.camera;

        const store = {
            position: camera.position.clone(),
            direction: camera.direction.clone(),
            up: camera.up.clone(),
            right: camera.right.clone(),
            transform: camera.transform.clone(),
            frustum: camera.frustum.clone()
        };

        this.props.updateMap({variables : {card_id : this.props.card.id, map : store}})
       // console.log(this.props);
    }

    componentDidMount() {
        if (this.viewer) {

            this.props.card.map && this.viewer.camera.flyTo({
                destination: new Cesium.Cartesian3(
                    this.props.card.map.position.x,
                    this.props.card.map.position.y,
                    this.props.card.map.position.z,
                ),
                orientation: {
                    direction   : new Cesium.Cartesian3(this.props.card.map.direction.x,    this.props.card.map.direction.y,    this.props.card.map.direction.z),
                    up          : new Cesium.Cartesian3(this.props.card.map.up.x,           this.props.card.map.up.y,           this.props.card.map.up.z)
                },
                duration: 0
            });


            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(this.remove);
            this.viewer.camera.moveEnd.addEventListener(this.saveCamera);
        }
    }

    componentWillUnmount() {
        this.viewer.scene.globe.tileLoadProgressEvent.removeEventListener(this.remove);
    }

    render() {
        return (
            <Viewer
                terrainProvider={terrainProvider}
                style={{ pointerEvents : (this.props.cesiumActive ? 'all' : 'none'), zIndex : 0, opacity : 0, position : 'absolute', top : (48 + this.props.yOffset + 'px'), left : '0px',  width : '100vw', height : '100vw'}}
                ref={e => {
                    this.viewer = e ? e.cesiumElement : undefined;
                }}
            >
                <Camera>
                    <Scene
                        highDynamicRange={true}
                    >
                        <Globe
                            enableLighting={false}
                            preloadSiblings={true}
                            tileCacheSize={2000}
                            maximumScreenSpaceError={1}
                        />
                    </Scene>
                </Camera>
            </Viewer>
        );
    }
}
