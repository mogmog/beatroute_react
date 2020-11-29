import { CompositeLayer } from '@deck.gl/core';
import ArrowSketchLayer from "../ArrowSketchLayer";
import {EditableGeoJsonLayer, DrawPolygonMode, DrawCircleByDiameterMode, DrawPointMode, DrawLineStringMode } from 'nebula.gl';
import * as turf from "@turf/turf";

let selectedFeatureIndexes = [];

export default class ArrowLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    renderLayers() {

        if (this.props.data.features.length ===0) return []; //for when nothing has been drawn

        const bbox = turf.bbox(this.props.data);

        const tr = this.context.deck.viewManager._viewports[0].project([bbox[2], bbox[3]])[0];
        const tl = this.context.deck.viewManager._viewports[0].project([bbox[0], bbox[1]])[0];

        const bl = this.context.deck.viewManager._viewports[0].project([bbox[0], bbox[1]])[1];

        const width = tr - tl;

        const height = this.context.deck.viewManager._viewports[0].project([bbox[0], bbox[1]])[1] - this.context.deck.viewManager._viewports[0].project([bbox[2], bbox[3]])[1] ;

        const arrow = new ArrowSketchLayer({
            opacity : 1,
            id: 'mask-arrow-layer',
            data : this.props.data,
            bounds: this.props.bounds,
            width,
            height,
            mapWidthOfBoundsInPixels : tr-tl,
            tl,
            tr,
            bl
        })

        return [ arrow ];
    }
}
