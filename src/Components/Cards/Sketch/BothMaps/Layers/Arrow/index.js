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

        const width = this.context.deck.viewManager._viewports[0].project([bbox[2], bbox[3]])[0] - this.context.deck.viewManager._viewports[0].project([bbox[0], bbox[1]])[0];

        const height = this.context.deck.viewManager._viewports[0].project([bbox[0], bbox[1]])[1] - this.context.deck.viewManager._viewports[0].project([bbox[2], bbox[3]])[1] ;

        //console.log(height);

        const arrow = new ArrowSketchLayer({
            opacity : 1,
            id: 'mask-arrow-layer',
            arrow : this.props.data,
            bounds: bbox,
            width, height
        })

        return [ arrow ];
    }
}
