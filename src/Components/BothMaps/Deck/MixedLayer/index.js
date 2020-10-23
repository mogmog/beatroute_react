import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import {WebMercatorViewport} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import * as turf from '@turf/turf/index';
//import {CubeGeometry} from 'luma.gl'
import CanvasMap from "../../Layers/CanvasMap";
import {CustomGeometry} from "../../../Cards/PhotosOnMap/Map/CustomGeometry";
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';

const square    = new CustomGeometry({size : 1, holed  : false});

export default class MixedLayer extends CompositeLayer {

    updateState({changeFlags}) {
        const {card, cesiumcontext} = this.props;
        if (changeFlags.dataChanged && card) {

            const bbox = turf.bbox(card.content.features[0]);

            const getPos = (pos, i, bearing, altitude) => {
                const test = turf.destination(pos, i, bearing, {units: 'meters'});
                return [test.geometry.coordinates[0],  test.geometry.coordinates[1], altitude]
            }

            //const center = turf.point(card.content.features[1].geometry.coordinates);

            this.setState({ bbox : bbox , a : 123});
        }
    }
    renderLayers() {

        return [
            new GeoJsonLayer({
            id: 'geojson-layer',
            data : this.props.card.content,
            pickable: true,
            stroked: false,
                opacity : 0,
            filled: true,
            extruded: true,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            getFillColor: [160, 160, 180, 0],
            getRadius: 100,
            getLineWidth: 1,
            getElevation: 30
            }),

         new BitmapLayer({
                id: 'bitmap-layer3',
                bounds:this.state.bbox,
                image: '/textures/paper4.jpg',
         }),

         new CanvasMap({viewer : this.props.viewer, globeScreenshot : this.props.globeScreenshot, bounds:this.state.bbox}),

         new SimpleMeshLayer({
            id: 'sketch3',
            opacity: 1,
            data: [
                   {
                            position: [0,0],
                            angle: 20,
                            color: [255, 0, 0]
                    },

                {
                    position: [0.5,-1],
                    angle: 2,
                    color: [255, 0, 0]
                }
                  ],
             mesh: square,
             getPosition: d => d.position,
             getColor: [255, 64, 64],
             texture :  './textures/photo.jpeg',
             getOrientation : (d) => [0, d.angle, 0],
             getTranslation: [ -50000.1,0.1, 0 ],
             sizeScale : 200000,

            parameters : {
                depthTest: false,
                depthMask: true,
            }
        })

        ];
    }
}
