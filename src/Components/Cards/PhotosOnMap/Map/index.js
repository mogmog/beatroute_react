import React, { Component } from 'react';

import { StaticMap } from 'react-map-gl';
import {Controller,  MapView} from '@deck.gl/core';
import DeckGL from '@deck.gl/react';
import {COORDINATE_SYSTEM, OrbitView, OrthographicView, AmbientLight, _CameraLight, LightingEffect} from '@deck.gl/core';
import {OrbitController, MapController} from '@deck.gl/core';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';
import {MVTLayer,} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
//import SimpleMeshLayer from './NewSimpleMesh/simple-mesh-layer/simple-mesh-layer'
import {SphereGeometry, PlaneGeometry, CubeGeometry} from '@luma.gl/engine';
import { SolidPolygonLayer, GeoJsonLayer, PathLayer } from '@deck.gl/layers';

import {CustomGeometry} from "./CustomGeometry";
import CardSaver from "../../../Saver";
import _ from "lodash";

const plane = new CustomGeometry({size : 1, holed  : false});

const framemesh = new CustomGeometry({size : 1, holed  : true});

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1
});

const cameraLight = new _CameraLight({
    color: [255, 255, 255],
    intensity: 0.25
});

const materialLayoutData = [
    {position: [0, 0, 0.0]},
];

class MapHolder extends Component {

    state = {
        mapCanvas : null
    };

    constructor(props) {
        super();
        this.search = _.debounce(e => e(), 500);
    }

    render() {

        const  material =new SimpleMeshLayer({
            id: 'cork',
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            opacity: 1,
            data : materialLayoutData,
            mesh: plane,
            getPosition: d => d.position,
           getOrientation : [180,180,180],
            getRotation : [180,180,180],
            getTranslation: [ 0, 0, 0.0 ],
            texture : this.state.mapCanvas || '/textures/squares.jpg',
            material : {
                ambient: 0.45,
                diffuse: 0.6,
                shininess: 0,
                specularColor: [255, 255, 255]
            }
        })

        const that = this;

        const mm = new TileLayer({
            id: 'mm',
            data :  'https://api.mapbox.com/styles/v1/mogmog/ck8ab16k20dw61imtg6hlx44k/draft/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw',
            //maxCacheSize : 10,
            //maxRequests : 10,

            onViewportLoad : (e) => {

                if(that.deckGL && that.deckGL.deck) {
                    //that.props.setEditMap(false);
                    //(that.deckGL.deck.redraw(true));
                    //that.setState({mapCanvas: that.deckGL.deck.canvas});
                    //(that.deckGL.deck.redraw(true));
                }
            },

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

        const vp = this.props.editMap ? this.props.viewState.map : this.props.viewState.orbit;

        return (
            <div>

                <CardSaver >

                    {
                        (updateCard, loading, error) => {

                            let that = this;

                            class OController extends OrbitController {

                                constructor(props) {
                                    super(props);
                                    this.invertPan = true;
                                }

                                handleEvent(event) {

                                    super.handleEvent(event);

                                    if (event.type === 'panend' || event.type === 'wheel' ) {
                                        that.search(() => updateCard({variables : {
                                            card_id : that.props.card.id,
                                            camera : that.props.viewState
                                        }}));
                                    }
                                }
                            }

                            class MController extends MapController {

                                constructor(props) {
                                    super(props);
                                    this.invertPan = true;
                                }

                                handleEvent(event) {

                                    super.handleEvent(event);

                                    if (event.type === 'panend' || event.type === 'wheel' ) {
                                        that.search(() => {
                                            updateCard({
                                                variables: {
                                                    card_id: that.props.card.id,
                                                    camera: that.props.viewState
                                                }
                                            });

                                        });

                                    }
                                }
                            }

                            return <DeckGL

                                effects={[]}
                                _animate={false}

                                pickingRadius={10}
                                layers={this.props.editMap ? [mm] : [material]}
                                //layers={  [mm] }
                                effects={[new LightingEffect({cameraLight, ambientLight})]}
                                viewState={vp}
                                views={

                                    this.props.editMap ?
                                        [new MapView({id: 'map',                        controller: MController})] :
                                        [new OrbitView({id: 'orbit', dragRotate: true,  controller: OController})]}

                                onViewStateChange={({viewId, viewState}) => {

                                    if (this.props.editMap) {
                                        this.props.updateViewState({ orbit: this.props.viewState.orbit, map: viewState});
                                    } else {
                                        this.props.updateViewState({map: this.props.viewState.map, orbit: viewState});
                                    }
                                }
                                }

                                pickingRadius={5}

                                ref={deck => {
                                    this.deckGL = deck;
                                }}

                                onAfterRender={ () => {
                                    if (this.deckGL && this.deckGL.deck) {
                                        that.setState({mapCanvas : that.deckGL.deck.canvas});

                                    }

                                    }}

                            >

                            </DeckGL>

                        }
                    }
                </CardSaver>

            </div>
        );
    }
}

export default MapHolder;
