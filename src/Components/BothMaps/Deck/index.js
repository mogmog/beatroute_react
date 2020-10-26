import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {WebMercatorViewport} from '@deck.gl/core';

import { Viewport, LinearInterpolator, FlyToInterpolator, TransitionInterpolator} from '@deck.gl/core';
import {MapController} from '@deck.gl/core';
import MixedLayer from './MixedLayer'
import {Component} from 'react';
import * as turf from "@turf/turf";
import _ from "lodash";
import "wired-elements";

const INIT_CAMERA = {
    minPitch : 0,
    maxPitch : 0,
    pitch : 0,

    longitude :   0,
    latitude :  0,
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
            viewState   :
                 INIT_CAMERA}

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

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!prevProps.moveMap && this.props.moveMap) {

            const round = num => Math.round(num * 100000) / 100000;

            const _viewport = new WebMercatorViewport(this.state.viewState);

            const bbox = turf.bbox(this.props.card.content.features[0]);

            const {longitude, latitude, zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);

            const viewState = {
                ...this.state.viewState,
                longitude: round(longitude),
                latitude: round(latitude),
                zoom : zoom,
                bearing : 0,
                transitionDuration : 'auto',
                transitionInterpolator: new FlyToInterpolator(),
                onTransitionEnd : ()=> {
                    alert('on')
                   // cb && cb(this.state.viewState)
                }
            };

            this.setState({ viewState });
        }
    }


    rotateCamera = () => {
        const round = num => Math.round(num * 100000) / 100000;

        const _viewport = new WebMercatorViewport(this.state.viewState);

        const bbox = turf.bbox(this.props.card.content.features[0]);

        const {longitude, latitude, zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);

        const viewState = {
            ...this.state.viewState,
            longitude: round(longitude),
            latitude: round(latitude),
            zoom : zoom,
            bearing : 0,
            transitionDuration : 'auto',
            transitionInterpolator: new FlyToInterpolator(),
            onTransitionEnd : ()=> {
                //alert('on')
                // cb && cb(this.state.viewState)
            }

        };

        this.setState({ viewState });
    }

    // rotateTable = () => {
    //
    //     const _viewport = new WebMercatorViewport(this.state.viewState);
    //
    //     const bbox = turf.bbox(this.props.card.content.features[0]);
    //
    //     const {longitude, latitude, zoom } = _viewport.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);
    //
    //     //const yOffset = _viewport.project([bbox[0], bbox[1]])[1];
    //
    //     this.performFlyTo({longitude, latitude, zoom : zoom}, this.matchCesiumAndDeck);
    //
    // }

    // matchCesiumAndDeck = (viewState) => {
    //
    //     //now the map is in  view, work out where to move the cesium map to.
    //     const _viewport = new WebMercatorViewport(viewState);
    //
    //     //get the bounds of the map holder
    //     const bbox = turf.bbox(this.props.card.content.features[0]);
    //
    //     const yOffset = _viewport.project([bbox[2], bbox[3]])[1];
    //
    //    // alert(yOffset);
    //     this.props.setYOffset(yOffset);
    //
    //     //this.props.setCesiumActive(false);
    //     //this.props.setDeckActive(false);
    //     //this.props.setCesiumActive(true);
    //
    // }

    // performFlyTo = (flyTo, cb) => {
    //     const round = num => Math.round(num * 100000) / 100000;
    //
    //     /* dereference what is passed in via props, using existing values if not passed in. */
    //     const {
    //         transitionDuration = 2000,
    //         longitude = this.state.viewState.longitude,
    //         latitude = this.state.viewState.latitude,
    //         bearing = 0,
    //         zoom = this.state.viewState.zoom,
    //         pitch = 0,
    //     } = flyTo;
    //
    //    // alert(cb);
    //
    //     const viewState = {
    //         ...this.state.viewState,
    //         longitude: round(longitude),
    //         latitude: round(latitude),
    //         zoom, pitch, bearing,
    //         transitionDuration : 2000,
    //         onTransitionEnd : ()=> {
    //             alert('on')
    //             cb && cb(this.state.viewState)
    //         }
    //
    //     };
    //
    //     this.setState({ viewState });
    //
    // }

    render() {

        const layers = [new MixedLayer({
            card     : this.props.card,
            viewer   : this.props.viewer,
            globeScreenshot : this.props.globeScreenshot
        })];

        return (
            <div>

                <a onClick={() => this.rotateCamera()}>click me</a>
                <div style={{ pointerEvents : (this.props.moveTable ? 'all' : 'none'), position: 'relative',width  :  '100%', height: '100vh' }}>

                    {(this.state.firstLoad) && <DeckGL
                     controller={ this.props.moveTable ? this.controller : false }
                     viewState={ this.state.viewState }
                     _animate={true}
                     height="100vw"
                     width="100%"
                     ref={deck => {
                         this.deckGL = deck;
                         this.props.setDeckRef(deck)
                     }}
                     xonAfterRender={ () => {

                         //if (false || this.state.editingMap) return;
                       //  console.log('running after render');
                         if (this.deckGL && this.deckGL.deck && ( this.state.firstLoad)) {
                            let allLayersLoaded = this.deckGL.deck.props.layers.every(layer => layer.isLoaded);

                            if (true && allLayersLoaded) {
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

                    } style={{width : '100%', height : '100vh'}} src={this.state.screenshot}/> }
                </div>

            </div>
        );
    }
}
