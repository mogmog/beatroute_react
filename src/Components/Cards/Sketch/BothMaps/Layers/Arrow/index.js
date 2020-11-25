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
        //const { altitude , cameraBearing} = this.state;
        //const {  image, out, center, title } = this.props;

        //this layer must be here for some reason
        // const draw = new EditableGeoJsonLayer({
        //     id: 'mask-geojson-layer-arrows',
        //     data: this.props.data,
        //     opacity : 1,
        //     mode: DrawLineStringMode,
        //    // selectedFeatureIndexes,
        //     onEdit: this.props.onEdit,
        // })

        if (this.props.data.features.length ===0) return []; //for when nothing has been drawn

        const arrow = new ArrowSketchLayer({
            opacity : 1,
            id: 'mask-arrow-layer',
            arrow : this.props.data,
            bounds: turf.bbox(this.props.data)
        })

        return [ arrow ];
    }
}
