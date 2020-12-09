import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';

import * as turf from '@turf/turf/index';

export default class PhotoLayer extends CompositeLayer {

    initializeState() {
        let self = this;

        let line = turf.lineString([[this.props.bounds[0], this.props.bounds[1]], [this.props.bounds[2], this.props.bounds[3]]]);
        let bbox = turf.bbox(line);
        let bboxPolygon = turf.bboxPolygon(bbox);

        const shrunk = turf.buffer(bboxPolygon, -3.056, {units: 'miles'})
        let translatedPoly = turf.transformTranslate(shrunk, 0.36, 0);
        translatedPoly = turf.bbox(turf.transformTranslate(translatedPoly, 0.08, 90));

        this.setState({translatedPoly});

    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    renderLayers() {

        const layer = new BitmapLayer({
            id: 'blank-polaroid-layer' + this.props.id,
            bounds: this.props.bounds,
            image: '/textures/blank_polaroid.png'
        })

        const layer2 = new BitmapLayer({
            id: 'photo' + this.props.id,
            bounds: this.state.translatedPoly,
            image: this.props.image
        })


        return [ layer, layer2 ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';
