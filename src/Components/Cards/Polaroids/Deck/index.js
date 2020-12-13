import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import { LightingEffect, AmbientLight, _CameraLight} from '@deck.gl/core';
import {Controller,  OrthographicController, MapView, OrthographicView} from '@deck.gl/core';
import {Component} from 'react';
import _ from "lodash";

import './index.less'
import {CustomGeometry} from "./CustomGeometry";
import GL from "@luma.gl/constants";

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.4
});

const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: 0.35
});

const INIT_CAMERA = {
    minPitch : 0,
    maxPitch : 0,
    pitch : 0,
    longitude :   0,
    latitude :  0,

    zoom : 6.5};

const plane = new CustomGeometry({size : 1, m : 1.03, holed  : false});

const materialLayoutData = [
    {position: [-10, -10, 0.0], angle : 5},
    {position: [-10, 50, 0.0], angle : -5},
];

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.search = _.debounce(e => e(), 300);
        this.state = {
            firstLoad : true,
            viewState   :  {orth : this.props.card.camera || {"orbitAxis":"Z","rotationX":0,"rotationOrbit":0,"target":[0,0,0],"zoom":2.5998110489966852}}
        }

        let that = this;

        class Controller extends OrthographicController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);

                if (event.type === 'panend' || event.type === 'wheel' ) {
                    //alert('saving');
                    that.search(() => props.updateCard({variables : {card_id : that.props.card.id, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        that.controller = Controller;

    }

    render() {

        let layers = [

            new SimpleMeshLayer({
                id: 'photo',
                getOrientation: d => [0, d.angle,0],
                getTranslation : [15,15,0],
                getScale: [78,78,1],
                opacity: 1,
                data : materialLayoutData,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/textures/bird.png',
                material : {
                    ambient: 0.45,
                    diffuse: 0.8,
                    shininess: 0.1,
                    specularColor: [255, 255, 255]
                }
            }),

            new SimpleMeshLayer({
                id: 'polaroid',
                getOrientation: d => [0, d.angle,0],
                getScale: [109,109,1],
                opacity: 1,
                data : materialLayoutData,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/textures/polaroid1.png',
                material : {
                    ambient: 1,
                    diffuse: 0.5,
                    shininess: 0.5,
                    specularColor: [255, 255, 255]
                },
                parameters: {
                    depthTest: true,
                    depthMask: true,
                    blend: true,
                    blendEquation: GL.FUNC_ADD,
                    blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                }
            }),





        ];

        return (
            <div>

                <div className="Deck" style={{ height : '600px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL

                        viewState={this.state.viewState}
                       // controller ={this.controller}
                        _animate={false}
                        height="100%"
                        width="100%"

                        views={

                            [
                                new OrthographicView({      id: 'orth',         controller : this.controller})
                            ]
                        }

                        ref={deck => {
                            this.deckGL = deck;
                        }}
                        xonAfterRender={ () => {

                            if (this.deckGL && this.deckGL.deck && ( this.state.firstLoad )) {
                                let allLayersLoaded = this.deckGL.deck.props.layers.every(layer => layer.isLoaded);

                                if (true && allLayersLoaded && this.props.globeScreenshot) {
                                    const ss = this.deckGL.deck.canvas.toDataURL();
                                    this.props.incrementLoadedCount();
                                    this.setState({ firstLoad : false, screenshot  : ss});
                                }
                            }

                        }}
                        effects={ [ new LightingEffect({ cameraLight, ambientLight }) ]}

                        onViewStateChange={({viewId, viewState}) => {

                            if (viewId === 'orth') {
                                this.setState({viewState: {
                                        orth : viewState ,
                                    }});
                            }
                        }
                        }

                        layers={layers}/> }

                    {false && !this.state.firstLoad  && !this.state.deckActive && <div>cache<img onClick={() => {

                        this.setState({editMap : true, editingMap : true}, ()=> {
                            this.setState({ screenshot : null})
                        });

                    }

                    } src={this.state.screenshot}/></div> }
                </div>

            </div>
        );
    }
}
