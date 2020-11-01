import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {WebMercatorViewport} from '@deck.gl/core';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import MixedLayer from './MixedLayer'
import {Component} from 'react';
import * as turf from "@turf/turf";
import * as d3 from "d3";
import _ from "lodash";

import './index.less'

const INIT_CAMERA = {
    minPitch : 0,
    maxPitch : 0,
    pitch : 0,

    longitude :   0,
    latitude :  0,
    // maxZoom : 9,
    // minZoom : 6,
    zoom : 6.5};

export default class extends Component {

    constructor(props) {
        super(props);

        this.search = _.debounce(e => e(), 300);
        this.state = {
            firstLoad : true,
            screenshot : null,
            editMap     : false,
            editingMap : false,
            useController : false,
            viewState   :  props.card.camera || INIT_CAMERA
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

    fit = (bbox) => {

        const _viewport = new WebMercatorViewport(  this.state.viewState );

        //fit map to window
        const {longitude, latitude, zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);

        //update the viewstate
        const viewState = {
            ...this.state.viewState,
            longitude: (longitude),
            latitude: (latitude),
            zoom : zoom,
            pitch : 0,
            bearing : 0,
            transitionDuration : 400,
            transitionInterpolator : new LinearInterpolator(),
            transitionEasing : d3.easeBack,
            onTransitionEnd : ()=> {
                this.props.setCesiumActive(true);
                this.props.setDeckActive(false);

                //this.moveCesium(viewState);
            }

        };

        this.setState({ viewState });

    }

    revert = () => {

        //update the viewstate
        const viewState = {
            ...this.state.viewState,
            longitude   : this.props.card.camera.longitude,
            latitude    : this.props.card.camera.latitude,
            zoom        : this.props.card.camera.zoom,
            pitch        : this.props.card.camera.pitch,
            bearing     : this.props.card.camera.bearing,

            transitionDuration : 500,
            transitionInterpolator : new FlyToInterpolator(),
            transitionEasing : d3.easeBack,
            // onTransitionEnd : ()=> {
            //     //this.props.setCesiumActive(true);
            //     //this.props.setDeckActive(false);
            //
            //     //this.moveCesium(viewState);
            // }

        };

        this.setState({ viewState });

    }

    moveCesium = (viewState) => {

        //now the map is in  view, work out where to move the cesium map to.
        const _viewport = new WebMercatorViewport(viewState);

        const bbox = turf.bbox(this.props.card.content.features[0]);

        const yOffset = _viewport.project([bbox[2], bbox[3]])[1];

        //alert(yOffset);

        this.props.setYOffset(yOffset);
    }

    performFlyTo = (flyTo, cb) => {
        const round = num => Math.round(num * 100000) / 100000;

        /* dereference what is passed in via props, using existing values if not passed in. */
        const {
            transitionDuration = 500,
            longitude = this.state.viewState.longitude,
            latitude = this.state.viewState.latitude,
            bearing = 0,
            zoom = this.state.viewState.zoom,
            pitch = 0,
        } = flyTo;

        const viewState = {
            ...this.state.viewState,
            longitude: round(longitude),
            latitude: round(latitude),
            zoom, pitch, bearing,
            transitionDuration,
            //transitionInterpolator : new LinearInterpolator(),
            transitionEasing : d3.easeBack,
            onTransitionEnd : ()=> cb && cb(viewState)

        };

        this.setState({ viewState });

    }

    render() {

        const layers = [new MixedLayer({
            card     : this.props.card,
            viewer   : this.props.viewer,
            globeScreenshot : this.props.globeScreenshot
        })];

        return (
            <div>

                {!this.props.cesiumActive && <wired-button elevation="2" disabled={this.props.deckActive}  onClick={()=> {
                    this.props.setCesiumActive(true);
                    this.fit(turf.bbox(this.props.card.content.features[0]));
                }}>
                   Change map
                </wired-button> }

                {this.props.cesiumActive && <wired-button elevation="2" disabled={this.props.deckActive} onClick={()=> {
                    this.props.setCesiumActive(false);
                    this.revert();
                }}>
                   Save
                </wired-button> }



                {!this.props.deckActive &&  <wired-button elevation="2" disabled={this.props.cesiumActive} onClick={()=> {
                    this.props.setCesiumActive(false);
                    this.props.setDeckActive(true);
                }}>
                    Move table
                </wired-button> }

                {this.props.deckActive && <wired-button elevation="2" disabled={this.props.cesiumActive} onClick={()=> {
                    this.props.setDeckActive(false);
                }}>
                    save table
                </wired-button> }

                <div className="Deck" style={{pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.editMap || this.state.firstLoad) && <DeckGL
                        controller={ this.controller }
                        viewState={ this.state.viewState }
                        _animate={true}
                        height="100%"
                        width="100%"

                        ref={deck => {
                            this.deckGL = deck;
                            this.props.setDeckRef(deck)
                        }}
                        xonAfterRender={ () => {

                            if (this.deckGL && this.deckGL.deck && ( this.state.firstLoad)) {
                                let allLayersLoaded = this.deckGL.deck.props.layers.every(layer => layer.isLoaded);

                                if (true && allLayersLoaded && this.props.globeScreenshot) {
                                    const ss = this.deckGL.deck.canvas.toDataURL();
                                    this.setState({ firstLoad : false, screenshot  : ss});
                                }
                            }

                        }}
                        effects={[]}
                        onViewStateChange={({viewState}) => this.setState({viewState: viewState})}
                        layers={layers}/> }

                    {false && !this.state.editMap && <img onClick={() => {

                        this.setState({editMap : true, editingMap : true}, ()=> {
                            this.setState({ screenshot : null})
                        });

                    }

                    } src={this.state.screenshot}/> }
                </div>

            </div>
        );
    }
}
