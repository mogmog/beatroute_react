import React, { Component } from 'react';

import {OrbitController} from '@deck.gl/core';

import { StaticMap } from 'react-map-gl';
import {Controller} from '@deck.gl/core';
import * as turf from '@turf/turf/index';
import rough from 'roughjs/bundled/rough.esm'
import {BitmapLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView, OrthographicView, AmbientLight, _CameraLight, LightingEffect} from '@deck.gl/core';
//import OController from './OrbitController'
import {MVTLayer,} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import GL from '@luma.gl/constants';
import  VideoLayer from './VideoLayer'
import  VideoLayer2 from './VideoLayer2'
import _ from 'lodash';
//import SimpleMeshLayer from './NewSimpleMesh/simple-mesh-layer/simple-mesh-layer'
import {SphereGeometry, PlaneGeometry, CubeGeometry} from '@luma.gl/engine';
import { SolidPolygonLayer, GeoJsonLayer, PathLayer } from '@deck.gl/layers';

import {CustomGeometry} from "./CustomGeometry";
import CardSaver from "../../../Saver";

const square    = new CustomGeometry({size : 1, holed  : false});
const plane     = new CustomGeometry({size : 6, holed  : false});
const framemesh = new CustomGeometry({size : 6, holed  : true});

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1
});

const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: 0.25
});



const squareLayoutData = [
    {position: [0, 0, 0.01]}

];

class SketchDisplay {

    constructor() {

        this.canvas = document.getElementById('canvas');
        this.ctx    = this.canvas.getContext('2d');

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.x = 0;

        // this.ctx.clearRect(0, 0, 1000, 20); // clear canvas
       // this.ctx.fillStyle = 'orange'; //set fill color
        //this.ctx.fillRect(0, 0, this.x, this.x);

        this.rough = rough;

        const that = this;

        var stop = false;
        var frameCount = 0;
        var req, fps, fpsInterval, startTime, now, then, elapsed, runs=0;
        var drawing = that.rough.generator().ellipse(250, 250, 250, 250, { curveFitting : 0.9, stroke: 'black', strokeWidth : 300, roughness: 1.8, seed : 1 });

        //let that = this;
        startAnimating(25);

        function startAnimating(fps) {
            fpsInterval = 1000 / fps;
            then = Date.now();
            startTime = then;
            animate();
            // _drawToContext(that.ctx, 40, drawing);
        }

        function animate() {

            if (stop) {
                return;
            }

            req = requestAnimationFrame(animate);

            now = Date.now();
            elapsed = now - then;

            if (elapsed > fpsInterval) {

                // Get ready for next frame by setting then=now, but...
                // Also, adjust for fpsInterval not being multiple of 16.67
                then = now - (elapsed % fpsInterval);

                var sinceStart = now - startTime;
                var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;

                that.x = that.x +1;

                if (that.x % 2) {
                    that.ctx.fillStyle = 'orange'; //set fill color
                } else {
                    that.ctx.fillStyle = 'white'; //set fill color
                }

                that.ctx.fillRect(0, 0, that.x, 50);

            }
        }
    }

}

//let sketchDisplay   = new SketchDisplay();

class MapHolder extends Component {

    constructor(props) {
        super();
        this.state  = {screenshot : null};
        this.search = _.debounce(e => e(), 300);
    }

    render() {

        const that = this;

        return (
            <div>

                <CardSaver >

                    {
                        (updateCard, loading, error) => {

                            let that = this;

                            class OController extends OrbitController {

                                constructor(props) {
                                    super(props);
                                    this.invertPan = true;
                                }

                                handleEvent(event) {

                                    super.handleEvent(event);

                                    if (event.type === 'panend' || event.type === 'wheel' ) {
                                        that.search(() => updateCard({variables : {card_id : that.props.card.id, camera : this.controllerState._viewportProps}}));
                                    }
                                }
                            }

                           // console.log(this.props.screenshot);
                            const maplayer  = new SimpleMeshLayer({
                                id: 'sketch2',
                                coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
                                opacity: 1,
                                data: squareLayoutData,
                                mesh: square,
                                getPosition: d => d.position,
                                getColor: [255, 64, 64],
                                texture :  this.props.screenshot,
                                getOrientation : [0,0,180],
                                getRotation : [0,0,0],
                                //getTranslation: [ 0.057, 0.155, 0.0072 ],
                                material : {
                                    ambient: 0.45,
                                    diffuse: 0.6,
                                    shininess: 0,
                                    specularColor: [255, 255, 255]
                                },
                                parameters : {
                                    depthTest: true,
                                    depthMask: true,

                                    blend: true,
                                    blendEquation: GL.FUNC_ADD,
                                    blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                                }
                            });

                            return <div>

                                {/*{true && this.state.screenshot && <img src={this.state.screenshot}/> }*/}

                                {true && <DeckGL



                                        effects={[]}

                                        _animate={true}

                                        pickingRadius={ 10 }
                                        layers={ [

                                            new SimpleMeshLayer({
                                                id: 'sketch3',
                                                coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
                                                opacity: 1,
                                                data: squareLayoutData,
                                                mesh: square,
                                                getPosition: d => d.position,
                                                getColor: [255, 64, 64],
                                                texture :  './textures/paper4.jpg',
                                                getOrientation : [0,0,180],
                                                getRotation : [0,0,0],
                                                //getTranslation: [ 0.057, 0.155, 0.0072 ],
                                                material : {
                                                    ambient: 0.45,
                                                    diffuse: 0.6,
                                                    shininess: 0,
                                                    specularColor: [255, 255, 255]
                                                },
                                                parameters : {
                                                    depthTest: true,
                                                    depthMask: true,
                                                }
                                            }),
                                            maplayer



                                        ] }
                                        effects={ [ new LightingEffect({ cameraLight, ambientLight }) ]}
                                        views={ [new OrbitView({dragRotate: true, controller :  OController})]}
                                        viewState={this.props.viewState}
                                        onViewStateChange={({ viewState }) => {
                                            // console.log(viewState);
                                            this.props.updateViewState(viewState)}}
                                        pickingRadius={5}
                                        //onLoad={this._onMapLoad}
                                        ref={deck => {
                                            this.deckGL = deck;
                                        }}

                                        // onAfterRender={ () => {
                                        //     if (this.deckGL && this.deckGL.deck) {
                                        //         //console.log(this.props.screenshot);
                                        //         //console.log(maplayer);
                                        //          this.setState({screenshot :  this.deckGL.deck.canvas.toDataURL()});
                                        //     }
                                        // }}
                                    >

                                    </DeckGL> }

                            </div>
                        }

                    }

                </CardSaver>


            </div>
        );
    }
}

export default MapHolder;
