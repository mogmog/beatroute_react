import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
//import SketchLine from '../Layers/CanvasLayer/SketchLine'
import { LightingEffect, AmbientLight, _CameraLight} from '@deck.gl/core';

import {Controller,  MapView, OrthographicView} from '@deck.gl/core';
import MapMaskLayer from '../Layers/MaskLayer'

import EditableLayer from './../Layers/Editable'
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';

import {EditableGeoJsonLayer, DrawPolygonMode, DrawCircleByDiameterMode,  DrawPointMode, DrawLineStringMode} from 'nebula.gl';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {Component} from 'react';
import _ from "lodash";
import Buttons from './Buttons'

import './index.less'
import {CustomGeometry} from "../../Map/CustomGeometry";

const myFeatureCollection = {
    type: 'FeatureCollection',
    features: [
        /* insert features here */
    ],
};

const arrowFeatureCollection = {
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
    zoom : 6.5};

const plane = new CustomGeometry({size : 1, m : 1.03, holed  : false});

const materialLayoutData = [
    {position: [-10, -10, 0.0], angle : 10},
    {position: [-20, -40, 0.0], angle : 15},
    {position: [-15, 20, 0.0], angle : 5},
];

const boundsNew = [[7.038968342537582,46.44328103264265],[7.014065973317429,47.93696136258996],[8.845893538374886,47.95086223368735],[8.870795907595065,46.457578766907]];

export default class extends Component {

    constructor(props) {
        super(props);

        this.search = _.debounce(e => e(), 300);
        this.state = {
            data: props.card.annotations || myFeatureCollection,
            firstLoad : true,
            screenshot : null,
            editMap     : false,
            editingMap : false,
            addInk : false,
            drawMode : null,
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

        let layers = [

            new MapMaskLayer({
                card: this.props.card,
                data: this.state.data,
                boundsNew  : boundsNew,
                sigcanvas : this.props.sigcanvas,
                onEdit : ({updatedData, editType}) => {

                    this.setState({ data: updatedData });

                    if (editType ==='addFeature') {

                        // debugger;

                        const tl = (this.deckGL.viewports[0].unproject([0,600],      {topLeft : false}));
                        const tr = (this.deckGL.viewports[0].unproject([500,600],    {topLeft : false}));
                        const bl = (this.deckGL.viewports[0].unproject([0,0],        {topLeft : false}));
                        const br = (this.deckGL.viewports[0].unproject([500,0],      {topLeft : false}));

                        console.log( [ bl, tl, tr, br ] );

                        // const tr = this.context.deck.viewManager._viewports[0].project([bbox[2], bbox[3]])[0];

                        this.props.updateAnnotation({variables : {card_id :  this.props.card.id, annotations : updatedData}});
                    }
                },
            }),

            new SimpleMeshLayer({
                id: 'photo',
                getOrientation: d => [0, d.angle,0],
                getScale: [110,110,1],
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

                {this.props.admin && <Buttons drawMode={this.state.drawMode} setDrawMode={(dm) => this.setState({ drawMode : dm })} addInk={this.state.addInk} deckActive={this.props.deckActive} cesiumActive={this.props.cesiumActive} revert={this.revert} fit={this.fit2} setDeckActive={this.props.setDeckActive} setCesiumActive={this.props.setCesiumActive} card={this.props.card} setFirstLoad={() => this.setState({firstLoad : true})} setAddInk={() => this.setState({addInk : !this.state.addInk})} fit={this.fit2}/> }

                <div className="Deck" style={{width : this.props.width + 'px', height : '600px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL

                        viewState={this.state.viewState}

                        views={

                            [
                                new MapView({               id: 'map',          controller : {type: this.controller, scrollZoom: true, doubleClickZoom : false}}),
                                //new OrthographicView({      id: 'orth',         controller : true})
                            ]
                        }

                        layerFilter={ ({layer, viewport}) => {

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
