import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {WebMercatorViewport} from '@deck.gl/core';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import MixedLayer from './MixedLayer'
import {Component} from 'react';
import * as turf from "@turf/turf";
import * as d3 from "d3";
import _ from "lodash";
import Buttons from './Buttons'

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

    fit2 = (bbox, center) => {

        const _viewport = new WebMercatorViewport( { ...this.state.viewState  });

        //find the zoom that fills the viewport
        const { zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);

        //fit map to window
       // const { zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);

        const centerOfRed = _viewport.getMapCenterByLngLatPosition({
            lngLat: center.geometry.coordinates,
            pos: [250, 250]
        });

        //alert(centerOfRed);

        //update the viewstate
        const viewState = {
            ...this.state.viewState,
            longitude: centerOfRed[0],
            latitude: centerOfRed[1],
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

        this.setState( {viewState : viewState });

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

    render() {

        const layers = [new MixedLayer({
            card     : this.props.card,
            viewer   : this.props.viewer,
            globeScreenshot : this.props.globeScreenshot
        })];

        return (
            <div>

                {this.props.admin && <Buttons deckActive={this.props.deckActive} cesiumActive={this.props.cesiumActive} revert={this.revert} fit={this.fit2} setDeckActive={this.props.setDeckActive} setCesiumActive={this.props.setCesiumActive} card={this.props.card} setFirstLoad={() => this.setState({firstLoad : true})} fit={this.fit2}/> }

                <div className="Deck" style={{width : '500px', height : '500px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL
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

                            if (this.deckGL && this.deckGL.deck && ( this.state.firstLoad )) {
                                let allLayersLoaded = this.deckGL.deck.props.layers.every(layer => layer.isLoaded);

                                if (true && allLayersLoaded && this.props.globeScreenshot) {
                                    const ss = this.deckGL.deck.canvas.toDataURL();
                                    this.props.incrementLoadedCount();
                                    this.setState({ firstLoad : false, screenshot  : ss});
                                }
                            }

                        }}
                        effects={[]}
                        onViewStateChange={({viewState}) => this.setState({viewState: viewState})}
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
