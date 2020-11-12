import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from "@deck.gl/layers";
import CanvasLayer from "../CanvasLayer";
import {DrawPointMode, EditableGeoJsonLayer } from "nebula.gl";
import * as turf from "@turf/turf";
import SketchLine from "../CanvasLayer/SketchLine";

let selectedFeatureIndexes = [];

export default class InkLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    // finalizeState() {
    //     super.finalizeState();
    // }

    renderLayers() {
        //const { altitude , cameraBearing} = this.state;
        //const {  image, out, center, title } = this.props;

        const draw = new EditableGeoJsonLayer({
            id: 'geojson-layer',
            data: this.props.data,
            opacity : 0,
            mode: DrawPointMode,
            selectedFeatureIndexes,
            onEdit: this.props.onEdit,
        })


        const inks = this.props.data.features.map((point, i) => {

            const canvas = new SketchLine();
            //canvas.startAnimating();

            var ellipse = turf.ellipse(point.geometry.coordinates, 5, 4);

            return new CanvasLayer({
                opacity : 1,
                id: 'ink-layer ' + i,
                image : canvas,
                width : 1000,
                bounds: turf.bbox(ellipse)
            })
        });

        return [ draw ].concat(inks);
    }
}
