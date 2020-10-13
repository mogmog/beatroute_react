import DeckGL from 'deck.gl';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {StaticMap} from 'react-map-gl';
import React from "react";
import {LinearInterpolator} from '@deck.gl/core';
import {PlaneGeometry} from '@luma.gl/engine';
import  {OrthographicView} from '@deck.gl/core'
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {AmbientLight, PointLight, DirectionalLight, LightingEffect} from '@deck.gl/core';



import {SimpleMeshLayer} from '@deck.gl/mesh-layers';

import {Matrix4} from 'math.gl';

import Combined from './CombinedFrame'
import Photo from './Photo'

const transitionInterpolator = new LinearInterpolator(['bearing']);

const INITIAL_VIEW_STATE = {
    longitude : 0, latitude : 0, zoom :11, bearing : 0
};

const plane = new PlaneGeometry({
    type: 'x,y',
    xlen: 3600,
    ylen: 4000,
    nx: 1,
    ny: 1,
    offset: 0
})

// create point light source
const pointLight = new PointLight({
    color: [255, 201, 34],
    intensity: 50,
    position:  [0,0, 5]
});

const lightingEffect = new LightingEffect({ pointLight });


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.rotationStep = 0;
        this.state = {
            viewState: INITIAL_VIEW_STATE
        };

        this._onLoad = this._onLoad.bind(this);
        this._onViewStateChange = this._onViewStateChange.bind(this);
        this._rotateCamera = this._rotateCamera.bind(this);
    }

    _onLoad() {
        this._rotateCamera();
    }

    _onViewStateChange({viewState}) {
        this.setState({viewState});
    }

    _rotateCamera() {
        // change bearing by 120 degrees.
        const bearing = this.state.viewState.bearing + 120;
        this.setState({
            viewState: {
                ...this.state.viewState,
                bearing,
                transitionDuration: 1600,
                transitionInterpolator,
                onTransitionEnd: this._rotateCamera
            }
        });
    }

    render() {
        const {viewState} = this.state;

        // const tilelayer = new TileLayer({
        //
        //     // https://api.mapbox.com/styles/v1/mogmog/ck8bqp5b4159j1io7qx652yda.html?fresh=true&title=view&access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw
        //
        //     data : 'https://api.mapbox.com/styles/v1/mogmog/ck8bqp5b4159j1io7qx652yda/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
        //
        //     renderSubLayers: props => {
        //         const {
        //             bbox: {west, south, east, north}
        //         } = props.tile;
        //
        //         return new BitmapLayer(props, {
        //
        //             data: null,
        //             image: '/greypaper.jpg',
        //             opacity : 0.8,
        //             bounds: [west, south, east, north]
        //         });
        //     }
        // });





        const layer = new SimpleMeshLayer({
            coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
            coordinateOrigin: [0, 0, 0],  // anchor point in longitude/latitude/altitude
            data: [
                {position: [100, 1000, 0]}, // meter offsets from the coordinate origin
            ],

            mesh: plane,
            texture: '/photo.jpeg',
        });

        const paperlayer = new SimpleMeshLayer({
            coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
            coordinateOrigin: [0, 0, 0],  // anchor point in longitude/latitude/altitude
            data: [
                {position: [0, 0, 0]}, // meter offsets from the coordinate origin
            ],

            mesh: plane,
            opacity : 1,
            texture: '/textures/greypaper.jpg',
        });

        // const combined = new Combined({
        //     title: 'Week 1 - California',
        //     image: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4809,37.7736,12.97,0/1280x1280@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
        //     out: true,
        //     center: [-122.5390, 37.6045]
        // });
        //
        // const photo = new Photo({ out : this.props.out, center : [ -122.5390, 37.6045]});

        return (
            <DeckGL
                effects={[lightingEffect]}
                //views ={new OrthographicView()}
                //initialViewState={ { target: [0, 0, 0], zoom: 0.000001 }}
                layers={[ paperlayer, layer  ]}
                viewState={viewState}
                _animate={true}
                //onLoad={this._onLoad}
                onViewStateChange={this._onViewStateChange}
                controller={true}
            >

                <StaticMap
                    mapboxApiAccessToken="pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
                    mapStyle="mapbox://styles/mogmog/cjvmiuhmr219r1cp6k0jtp1rk"
                />

            </DeckGL>
        );
    }
}
