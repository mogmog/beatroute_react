import React, { Component } from 'react';

import { StaticMap } from 'react-map-gl';
import {Controller} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView, OrthographicView, AmbientLight, _CameraLight, LightingEffect} from '@deck.gl/core';
import OController from './OrbitController'
import {MVTLayer,} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
//import SimpleMeshLayer from './NewSimpleMesh/simple-mesh-layer/simple-mesh-layer'
import {SphereGeometry, PlaneGeometry, CubeGeometry} from '@luma.gl/engine';
import { SolidPolygonLayer, GeoJsonLayer, PathLayer } from '@deck.gl/layers';

import {CustomGeometry} from "./CustomGeometry";

// const  plane = new PlaneGeometry({
//     type: 'x,y',
//     xlen: 1,
//     ylen: 1,
//     nx: 1,
//     ny: 1,
//     offset: 0
// })

const plane = new CustomGeometry({size : 6, holed  : false});

const framemesh = new CustomGeometry({size : 6, holed  : true});

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1
});

const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: 0.25
});

const materialLayoutData = [
    {position: [0, 0, 0.0]},

];

const frameLayoutData = [
    {position: [0, 0, 0.01]},
];

class MapHolder extends Component {

    state = {

    };

    _onMapLoad = () => {

        this.props.performFlyTo && this.props.performFlyTo({latitude: 42.34436805740429,
            longitude: -96.07236678750705,
            zoom: 2.701224544215334});
    }

    render() {

        const  frame =new SimpleMeshLayer({
            id: 'background',
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            opacity: 1,
            data: frameLayoutData,
            mesh: framemesh,
            getPosition: d => d.position,
            //getOrientation : [0,0,90],
            getColor: [255, 64, 64],
            //getTranslationOld: [ 0.1, -0.5, 0.1 ],
            //getTranslation: [ 0.0, 0, 0.1 ],
            texture : '/textures/wood.jpg',
            material : {
                ambient: 0.45,
                diffuse: 0.6,
                shininess: 0,
                specularColor: [255, 255, 255]
            }
        })

        const  material =new SimpleMeshLayer({
            id: 'cork',
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            opacity: 1,
            data : materialLayoutData,
            mesh: plane,
            getPosition: d => d.position,
            //getOrientation : [0,0,90],
            getColor: [128, 128, 128],
            getTranslation: [ 0.0, 0, 0.0 ],
            texture : '/textures/squares.jpg',
            material : {
                ambient: 0.45,
                diffuse: 0.6,
                shininess: 0,
                specularColor: [255, 255, 255]
            }
        })

        const that = this;

        return (
            <div>

                <DeckGL

                    effects={[]}
                    _animate={false}

                    pickingRadius={ 10 }
                    layers={[  frame, material]}
                    effects={ [ new LightingEffect({ cameraLight, ambientLight }) ]}
                    views={ [new OrbitView({dragRotate: true, controller : OController})]}
                    // initialViewState={this.props.viewState  }
                    viewState={this.props.viewState}
                    onViewStateChange={({ viewState }) => {
                        console.log(viewState);
                        this.props.updateViewState(viewState)}}
                    pickingRadius={5}
                    //onLoad={this._onMapLoad}
                    ref={deck => {
                        this.deckGL = deck;
                    }}
                >

                </DeckGL>

            </div>
        );
    }
}

export default MapHolder;
