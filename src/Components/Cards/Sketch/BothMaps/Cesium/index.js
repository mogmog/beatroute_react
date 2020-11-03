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

            let mbToken = 'pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw';

            //mapbox://styles/mogmog/ckg861arn0d9e1asbj1tpbk8y

            var streetsLayer = new Cesium.MapboxStyleImageryProvider({
                styleId: 'ckg861arn0d9e1asbj1tpbk8y',
                accessToken: mbToken
            });



            // Access the CartoDB Positron basemap, which uses an OpenStreetMap-like tiling scheme.
            var positron = new Cesium.UrlTemplateImageryProvider({
                url : 'https://api.mapbox.com/styles/v1/mogmog/ck8ab16k20dw61imtg6hlx44k/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
                xurl : 'https://api.maptiler.com/maps/1dd0e632-6104-49fc-aa85-b0f3b3e58fb3/256/{z}/{x}/{y}@2x.png?key=cZQg2QaktSnI18BSAxZX',
                credit : 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
            });

            //https://api.mapbox.com/styles/v1/mogmog/ckg861arn0d9e1asbj1tpbk8y.html?title=true&access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw#7.7/37.723153/-122.238205/0https://api.mapbox.com/styles/v1/mogmog/ckg861arn0d9e1asbj1tpbk8y.html?title=true&access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw#7.7/37.723153/-122.238205/0

            var imageryLayer = this.viewer.imageryLayers.addImageryProvider(
                positron
            );

           // let blp = this.viewer.baseLayerPicker.viewModel;
           // blp.imageryProviderViewModels.unshift(mapBoxSatStreets);



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
