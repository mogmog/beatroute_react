import React, { Component } from 'react';

import {OrbitController} from '@deck.gl/core';
import { MapController, FirstPersonController} from 'deck.gl'
import { StaticMap } from 'react-map-gl';
import {Controller} from '@deck.gl/core';
import * as turf from '@turf/turf/index';
import {TileLayer} from '@deck.gl/geo-layers';
import rough from 'roughjs/bundled/rough.esm'
import {BitmapLayer} from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView, OrthographicView, AmbientLight, _CameraLight, LightingEffect} from '@deck.gl/core';
//import OController from './OrbitController'
import {MVTLayer,} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import GL from '@luma.gl/constants';

import _ from 'lodash';

class MapHolder2 extends Component {

    constructor(props) {
        super();
        this.state  = {screenshot : null,

        viewState : {
            zoom: 9.118817401028235,
            longitude: -122.19447943356916,
            latitude: 37.69231180529589,
            bearing: 0,
            pitch: 0,
            maxZoom : 14,
            minZoom : 2
        }};

        let that =this;

        this.layer = new TileLayer({
            data: 'https://api.mapbox.com/styles/v1/mogmog/ck8ab16k20dw61imtg6hlx44k/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',

            // onViewportLoad : (data) => {
            //     console.log(data);
            //     //(that.deckGL.deck.redraw(true));
            //     that.props.setScreenshot(data[0]);
            //    // console.log(that.deckGL.deck.canvas.toDataURL());
            // },

            renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {

                    data: null,
                    image: props.data,

                    opacity: 1,

                    bounds: [west, south, east, north]
                });
            }
        })

        this.db = _.debounce((view) => {
            //(that.deckGL.deck.redraw(true));

            //that.layer.redraw(true);
            //that.deckGL.deck.redraw(true)
            //that.layer.redraw();
            that.deckGL.deck.redraw(true);
            (that.props.setScreenshot(that.deckGL.deck.canvas.toDataURL()));
        }, 50)

        class MyController extends MapController {

        handleEvent(event) {

            super.handleEvent(event);

            if (event.type === 'panend' || event.type === 'wheel' ) {

                that.db();
                //that.deckGL.deck.redraw(true);
                //that.deckGL.deck.redraw(true);
                //that.props.setScreenshot(that.deckGL.deck.canvas.toDataURL());
                //alert(1);
            }
        }
    }

    this.controller = MyController;


        //this.search = _.debounce(e => e(), 300);

    }

    render() {

        const that = this;

        return (
            <DeckGL
                controller={this.controller}

                // glOptions={ {
                //     preserveDrawingBuffer: true  // for printing - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
                // }}

                effects={[]}

                //_animate={true}

                pickingRadius={ 10 }
                layers={ [
                    this.layer
                ] }
                viewState={this.state.viewState}

                onViewStateChange={({ viewState }) => {
                    this.setState({viewState: viewState})
                }}

                pickingRadius={5}

                ref={deck => {
                    this.deckGL = deck;
                }}

                xonAfterRender={ () => {
                    if (this.deckGL && this.deckGL.deck) {
                        //console.log(this.props.screenshot);
                        //console.log(maplayer);
                        this.setState({screenshot :  this.deckGL.deck.canvas.toDataURL()});
                    }
                }}
            >

            </DeckGL>
        );
    }
}

export default MapHolder2;



// /* eslint-disable max-statements */
// import React, {useState,  useEffect, useRef, useCallback} from 'react';
// import {render} from 'react-dom';
// import DeckGL from '@deck.gl/react';
// import { MapController, FirstPersonController} from 'deck.gl'
// import {View, MapView,  FirstPersonView} from '@deck.gl/core';
// import {WebMercatorViewport} from '@deck.gl/core';
// import {BitmapLayer} from '@deck.gl/layers';
// import {TileLayer} from '@deck.gl/geo-layers';
// import _ from 'lodash'
//
// const INITIAL_VIEW_STATE = {
//     zoom: 9.118817401028235,
//     longitude: -122.19447943356916,
//     latitude: 37.69231180529589,
//     bearing: 0,
//     pitch: 0,
//     maxZoom : 14,
//     minZoom : 2
// };
//
//
// export default function TerrainMap({ setScreenshot, initialViewState = INITIAL_VIEW_STATE }) {
//
//     const [deck, setDeck] = useState(null);
//     const inputEl = useRef(null);
//     const [v, setV] = useState(new WebMercatorViewport(initialViewState));
//
//     //db = _.debounce((view) => { this.props.updateCard(view)}, 100);
//
//     class MyController extends MapController {
//
//         handleEvent(event) {
//
//             super.handleEvent(event);
//
//             if (event.type === 'panend' || event.type === 'wheel' ) {
//                // setScreenshot(inputEl.current.deck.canvas.toDataURL());
//                // alert(1);
//             }
//         }
//     }
//
//     const maplayer = new TileLayer({
//         data: 'https://api.mapbox.com/styles/v1/mogmog/ck8ab16k20dw61imtg6hlx44k/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
//
//         renderSubLayers: props => {
//             const {
//                 bbox: {west, south, east, north}
//             } = props.tile;
//
//             return new BitmapLayer(props, {
//
//                 data: null,
//                 image: props.data,
//
//                 //updateTriggers : { opacity : [v.zoom] },
//
//                 opacity: 1,
//
//                 bounds: [west, south, east, north]
//             });
//         }
//     });
//
//     //const debouncedCount = useCallback(_.debounce(setScreenshot, 10),[]);
//
//
//     return <DeckGL
//         initialViewState={v}
//         viewState={v}
//         _animate={true}
//         onViewStateChange={(v) => setV(new WebMercatorViewport(v.viewState))}
//         controller={MyController}
//
//
//
//         ref={inputEl}
//
//
//         layers={[maplayer]}
//         glOptions={ {
//             preserveDrawingBuffer: false  // for printing - https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
//         }}
//
//     >
//         {/*<MapView id="baseMap" controller={MyController} y="0%" height="100%" width={'100%'} />*/}
//
//     </DeckGL>
//
//
// }
//
