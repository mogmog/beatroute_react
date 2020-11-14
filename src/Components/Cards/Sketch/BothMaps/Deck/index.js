import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
//import SketchLine from '../Layers/CanvasLayer/SketchLine'
import MaskLayer from '../Layers/MaskLayer'
import { EditableGeoJsonLayer, DrawPolygonMode , DrawCircleByDiameterMode} from 'nebula.gl';

import {Component} from 'react';
import _ from "lodash";
import Buttons from './Buttons'

import './index.less'

//const canvas = new SketchLine();

const myFeatureCollection = {
    type: 'FeatureCollection',
    features: [
        /* insert features here */
    ],
};

const selectedFeatureIndexes = [];

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
            data: myFeatureCollection,
            firstLoad : true,
            screenshot : null,
            editMap     : false,
            editingMap : false,
            addInk : false,
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

    render() {

        const layers = [

            new MaskLayer({
               card: this.props.card,
               set : ({updatedData}) => {
                   this.setState({
                       data: updatedData,
                   })
               },
                data: this.state.data}),
        ];

        return (
            <div>

                <code> {this.props.width} </code>

                {this.props.admin && <Buttons addInk={this.state.addInk} deckActive={this.props.deckActive} cesiumActive={this.props.cesiumActive} revert={this.revert} fit={this.fit2} setDeckActive={this.props.setDeckActive} setCesiumActive={this.props.setCesiumActive} card={this.props.card} setFirstLoad={() => this.setState({firstLoad : true})} setAddInk={() => this.setState({addInk : !this.state.addInk})} fit={this.fit2}/> }

                <div className="Deck" style={{width : this.props.width + 'px', height : '600px', pointerEvents : this.props.deckActive ? 'all' : 'none'}}>

                    {(this.state.firstLoad) && <DeckGL
                        controller={ true  && this.controller }
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
