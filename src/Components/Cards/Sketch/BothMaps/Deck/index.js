import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
//import SketchLine from '../Layers/CanvasLayer/SketchLine'
import { LightingEffect, AmbientLight, _CameraLight} from '@deck.gl/core';

import {Controller,  MapView, OrthographicView} from '@deck.gl/core';
import MapMaskLayer from '../Layers/MaskLayer'
import { EditableGeoJsonLayer, DrawPolygonMode , DrawCircleByDiameterMode} from 'nebula.gl';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {Component} from 'react';
import _ from "lodash";
import Buttons from './Buttons'

import './index.less'
import PhotoLayer from "../Layers/Photo";
import {CustomGeometry} from "../../Map/CustomGeometry";

//const canvas = new SketchLine();

const myFeatureCollection = {
    type: 'FeatureCollection',
    features: [
        /* insert features here */
    ],
};

const selectedFeatureIndexes = [];

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
    // maxZoom : 9,
    // minZoom : 6,
    zoom : 6.5};

const plane = new CustomGeometry({size : 1, holed  : false});

const materialLayoutData = [
    {position: [0, -50, 0.0], angle : -10},
    {position: [-20, -60, 0.0], angle : 15},
    {position: [-15, 10, 0.0], angle : 5},
];

export default class extends Component {

    constructor(props) {
        super(props);

        this.search = _.debounce(e => e(), 300);
        this.state = {
            data: myFeatureCollection,
            firstLoad : true,
            screenshot : null,
            editMap     : false,
            editingMap : false,
            addInk : false,
            useController : false,
            viewState   :  {map : props.card.camera || INIT_CAMERA, orth : {"orbitAxis":"Z","rotationX":0,"rotationOrbit":0,"target":[0,0,0],"zoom":1.5998110489966852}}
        }
        let that = this;

        class Controller extends MapController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);

                if (event.type === 'panend' || event.type === 'wheel' ) {
                    that.search(() => props.updateCard({variables : {card_id : that.props.card.id, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        that.controller = Controller;

    }

    render() {

        const zoomFactor = (this.state.viewState.zoom) ;

        const layers = [

            new MapMaskLayer({
               card: this.props.card,
               set : ({updatedData}) => {
                   this.setState({
                       data: updatedData,
                   })
               },
                data: this.state.data}),

            new SimpleMeshLayer({
                id: 'photo',
                getOrientation: d => [0, d.angle,0],
                getScale: [100,100,1],
                opacity: 1,
                data : materialLayoutData,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/textures/blank_polaroid.png',
                material : {
                    ambient: 0.45,
                    diffuse: 0.8,
                    shininess: 0.2,
                    specularColor: [255, 255, 255]
                }
            })
        ];

        return (
            <div>

                <code> {this.props.width} </code>

                {this.props.admin && <Buttons addInk={this.state.addInk} deckActive={this.props.deckActive} cesiumActive={this.props.cesiumActive} revert={this.revert} fit={this.fit2} setDeckActive={this.props.setDeckActive} setCesiumActive={this.props.setCesiumActive} card={this.props.card} setFirstLoad={() => this.setState({firstLoad : true})} setAddInk={() => this.setState({addInk : !this.state.addInk})} fit={this.fit2}/> }

                <div className="Deck" style={{width : this.props.width + 'px', height : '600px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL

                        viewState={this.state.viewState}

                        views={

                            [
                                new MapView({               id: 'map',          controller : this.controller}),
                                new OrthographicView({      id: 'orth',         controller : false})
                            ]
                        }
                        layerFilter={ ({layer, viewport}) => {

                            //console.log(viewport.id, layer.id);

                        if (viewport.id === 'map' && layer.id.indexOf('mask') > -1) {
                              return true;
                            }

                            if (viewport.id === 'orth' && layer.id.indexOf('photo') > -1) {
                                return true;
                            }

                            return false;
                          }}
                        _animate={false}
                        height="100%"
                        width="100%"

                        ref={deck => {
                            this.deckGL = deck;
                            this.props.setDeckRef(deck)
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
                           if (viewId === 'map') this.setState({viewState: {
                               map : viewState,
                               orth : this.state.viewState.orth

                           }});

                           if (viewId === 'orth') {
                               this.setState({viewState: {
                                   orth : viewState ,
                                       map : this.state.viewState.map

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
