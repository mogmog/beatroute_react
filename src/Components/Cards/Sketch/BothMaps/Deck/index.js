import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import { LightingEffect, AmbientLight, _CameraLight} from '@deck.gl/core';

import {Controller,  MapView, OrthographicView} from '@deck.gl/core';
import MapMaskLayer from '../Layers/MaskLayer'

import {Component} from 'react';
import _ from "lodash";
import Buttons from './Buttons'
import './index.less'

const myFeatureCollection = {
    type: 'FeatureCollection',
    features: [
        /* insert features here */
    ],
};

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

const boundsNew = [[7.038968342537582,46.44328103264265],[7.014065973317429,47.93696136258996],[8.845893538374886,47.95086223368735],[8.870795907595065,46.457578766907]];

var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;

var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle = "green";
ctx.fillRect(0, 0, 250, 250);
ctx.stroke();

export default class extends Component {

    //hack to ensure that when aannotations are cleared in db they reflect in ui
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.card.annotations !== this.props.card.annotations  && !this.props.card.annotations) {
            this.setState({data : myFeatureCollection});
        }
    }

    constructor(props) {
        super(props);

        this.search = _.debounce(e => e(), 300);

        this.defaultViewstate = {map : props.card.camera || INIT_CAMERA, orth : {"orbitAxis":"Z","rotationX":0,"rotationOrbit":0,"target":[0,0,0],"zoom":1.5998110489966852}};

        this.state = {
            data: props.card.annotations || myFeatureCollection,
            firstLoad : true,
            screenshot : null,
            editMap     : false,
            editingMap : false,
            addInk : false,
            drawMode : null,
            useController : false,
            viewState   :  this.defaultViewstate
        }

        let that = this;

        class Controller extends MapController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);

                if (!that.props.addLandscapeMode && (event.type === 'panend' || event.type === 'wheel' )) {
                    that.search(() => props.updateCard({variables : {card_id : that.props.card.id, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        that.controller = Controller;

    }

    saveLandscapeBound = (v) => {
        const height = 500;
        console.log(this.deckGL.deck);
        const tl = ( this.deckGL.deck.viewManager._viewports[0].unproject([0, height],      {topLeft : false}));
        const tr = ( this.deckGL.deck.viewManager._viewports[0].unproject([this.props.width, height],    {topLeft : false}));
        const bl = ( this.deckGL.deck.viewManager._viewports[0].unproject([0,0],        {topLeft : false}));
        const br = ( this.deckGL.deck.viewManager._viewports[0].unproject([this.props.width,0],      {topLeft : false}));

        var bounds = {
            ne: { latitude: tr[1], longitude: tr[0] },
            sw: { latitude: bl[1], longitude: bl[0] }
        };

        this.props.updateLandscape({variables : {card_id : this.props.card.id, landscapecamera : bounds}});
        console.log("br");
        console.log(br);

    }

    revertView = () => {
        this.setState({viewState : this.defaultViewstate});
    }

    render() {

        let layers = [

            new MapMaskLayer({
                card    : this.props.card,
                data    : this.state.data,
                width   : this.props.width,
                height  : this.props.height,
                canvas  : canvas,

                onEdit : ({updatedData, editType}) => {

                    this.setState({ data: updatedData });

                    if (editType ==='addFeature') {
                        this.props.updateAnnotation({ variables : {card_id :  this.props.card.id, annotations : updatedData}});
                    }
                },
            })

            // new SimpleMeshLayer({
            //     id: 'photo',
            //     getOrientation: d => [0, d.angle,0],
            //     getScale: [110,110,1],
            //     opacity: 1,
            //     data : materialLayoutData,
            //     mesh: plane,
            //     getPosition: d => d.position,
            //     texture : '/textures/polaroid1.png',
            //     material : {
            //         ambient: 0.45,
            //         diffuse: 0.8,
            //         shininess: 0.2,
            //         specularColor: [255, 255, 255]
            //     }
            // })
        ];

        return (
            <div>

                {this.props.admin && <Buttons saveLandscapeBound={this.saveLandscapeBound} viewState={this.state.viewState} revertView={this.revertView} addLandscapeMode={this.props.addLandscapeMode} refetch={this.props.refetch} drawMode={this.state.drawMode} setDrawMode={(dm) => this.setState({ drawMode : dm })} addInk={this.state.addInk} deckActive={this.props.deckActive} cesiumActive={this.props.cesiumActive} revert={this.revert} fit={this.fit2} setDeckActive={this.props.setDeckActive} setCesiumActive={this.props.setCesiumActive} card={this.props.card} setFirstLoad={() => this.setState({firstLoad : true})} setAddInk={() => this.setState({addInk : !this.state.addInk})} fit={this.fit2} setAddLandScapeMode={this.props.setAddLandScapeMode}/> }

                <div className="Deck" style={{width : this.props.width + 'px', height : this.props.width + 'px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL

                        viewState={this.state.viewState}

                        views={

                            [
                                new MapView({               id: 'map',          controller : {type: this.controller, touchRotate : false, dragRotate : false, scrollZoom: true, doubleClickZoom : false}}),
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
                        xglOptions={ {
                            preserveDrawingBuffer: true  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
                        }}
                        xonAfterRender={ () => {

                            if (false && this.deckGL && this.deckGL.deck ) {
                                let allLayersLoaded = this.deckGL.deck.props.layers.every(layer => layer.isLoaded);

                                console.log(allLayersLoaded);


                                if (true && allLayersLoaded) {
                                    //alert('loaded')
                                    // this.deckGL.deck.redraw(true)
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
