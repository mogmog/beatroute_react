import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import {WebMercatorViewport} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import * as turf from '@turf/turf/index';
//import {CubeGeometry} from 'luma.gl'
import CanvasMap from "../../Layers/CanvasMap";
import {CustomGeometry} from "../../../Map/CustomGeometry";
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';

const square    = new CustomGeometry({size : 1, holed  : false});

export default class MixedLayer extends CompositeLayer {

    updateState({changeFlags}) {
        const {card, cesiumcontext} = this.props;
        if (changeFlags.dataChanged && card  && card.content && card.content.features && card.content.features.length) {
            this.setState({ bbox : turf.bbox(card.content.features[0]) , a : 123});
        }
    }
    renderLayers() {

        if (this.state.bbox) {
            return [
                // new GeoJsonLayer({
                //     id: 'geojson-layer',
                //     data : this.props.card.content,
                //     pickable: true,
                //     stroked: false,
                //     opacity : 1,
                //     filled: true,
                //     extruded: true,
                //     lineWidthScale: 20,
                //     lineWidthMinPixels: 2,
                //     getFillColor: [160, 160, 180, 0],
                //     getRadius: 100,
                //     getLineWidth: 1,
                //     getElevation: 30
                // }),

                new BitmapLayer({
                    id: 'bitmap-layer-frame',
                    bounds:this.state.bbox,
                    opacity : 1,
                    image: '/textures/paper5.jpg',
                }),

                new CanvasMap({viewer : this.props.viewer, globeScreenshot : this.props.globeScreenshot, bounds:this.state.bbox}),



            ];
        }

        return []

    }
}
