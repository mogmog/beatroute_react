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
            bounds : null
        });
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  data } = this.props;

       // console.log(data);

        const layer = new EditableGeoJsonLayer({
            id: 'mask-geojson-layer-linestring',
            data: data,
            opacity : 0.3,
            mode: DrawLineStringMode,
            onEdit : this.props.onEdit

        })

        return [ layer ];
    }
}

EditableLayer.componentName = 'maskMaskLayer';
