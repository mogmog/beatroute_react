import { CompositeLayer } from '@deck.gl/core';
import SketchLayer from "../SketchLayer";
import {DrawPointMode, EditableGeoJsonLayer } from "nebula.gl";
import * as turf from "@turf/turf";

let selectedFeatureIndexes = [];

export default class InkLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    renderLayers() {
        //const { altitude , cameraBearing} = this.state;
        //const {  image, out, center, title } = this.props;

        //this layer must be here for some reason
        // const draw = new EditableGeoJsonLayer({
        //     id: 'mask-geojson-layer',
        //     data: this.props.data,
        //     opacity : 1,
        //     mode: DrawPointMode,
        //     selectedFeatureIndexes,
        //     onEdit: this.props.onEdit,
        // })

        const inks = this.props.data.features.filter(f => f.geometry.type ==='Point').map((point, i) => {

            var ellipse = turf.ellipse(point.geometry.coordinates, 10, 10);

            return new SketchLayer({
                opacity : 1,
                id: 'mask-ink-layer ' + i,
                bounds: turf.bbox(ellipse)
            })
        });

        return [  ].concat(inks);
    }
}
