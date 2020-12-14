import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';

import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import { LightingEffect, AmbientLight, _CameraLight} from '@deck.gl/core';
import {Controller,  OrthographicController, MapView, OrthographicView} from '@deck.gl/core';
import {Component} from 'react';
import PP from './../Deck/Layers/PolaroidAndPhoto'

import _ from "lodash";

import './index.less'
import {CustomGeometry} from "./Layers/PolaroidAndPhoto/CustomGeometry";
import GL from "@luma.gl/constants";

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.4
});

const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: 0.35
});

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
                new PP({
                    id : this.props.card.id + '1',
                    data : [
                        {position: [-10, -10, 0.0], angle : 5},
                    ]
                }),
                new PP({
                    id : this.props.card.id +  '2',
                    data : [
                        {position: [0, 90, 0.0], angle : -5},
                    ]
                }),
            new PP({
                id : this.props.card.id + '3',
                data : [
                    {position: [0, 180, 0.0], angle : 5},
                ]
            })
        ];

        return (
            <div>

                <div className="Deck" style={{ height : '1200px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

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
