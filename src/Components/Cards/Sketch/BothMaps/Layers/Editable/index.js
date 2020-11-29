import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import InkLayer from "../Ink";
import Arrow from "../Arrow";
import PhotoLayer from "../Photo";
import * as turf from '@turf/turf/index';
import {DrawPointMode, DrawPolygonByDraggingMode, DrawLineStringMode, EditableGeoJsonLayer} from "nebula.gl";

export default class EditableLayer extends CompositeLayer {

    initializeState() {

        let self = this;

        this.setState({
            altitude : 0,
            bounds : null
        });
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  image, out, center, title } = this.props;

        const layer = new EditableGeoJsonLayer({
            id: 'mask-geojson-layer-point2',
            data: this.props.data,
            opacity : 1,
            mode: DrawPointMode,
            onEdit : this.props.onEdit

        })

        return [ layer ];
    }
}

EditableLayer.componentName = 'maskMaskLayer';
