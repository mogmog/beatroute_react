import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';

import * as turf from '@turf/turf/index';

export default class PhotoLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    renderLayers() {

        const layer = new BitmapLayer({
            id: 'photo-layer',
            bounds: this.props.bounds,
            image: '/textures/blank_polaroid.png'
        })

        //var point = turf.polygon(this.props.bounds);
        //var buffered = turf.buffer(point, 500, {units: 'miles'});

        var line = turf.lineString([[this.props.bounds[0], this.props.bounds[1]], [this.props.bounds[2], this.props.bounds[3]]]);
        var bbox = turf.bbox(line);
        var bboxPolygon = turf.bboxPolygon(bbox);

        const shrunk = turf.buffer(bboxPolygon, -3.056, {units: 'miles'})
        var translatedPoly = turf.transformTranslate(shrunk, 0.36, 0);
        translatedPoly = turf.transformTranslate(translatedPoly, 0.08, 90);

        const layer2 = new BitmapLayer({
            id: 'photo-layer2',
            bounds: turf.bbox(translatedPoly),
            image: this.props.image
        })


        return [ layer, layer2 ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';


