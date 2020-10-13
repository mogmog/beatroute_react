import React from 'react';
import {TileLayer} from '@deck.gl/geo-layers';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import { GeoJsonLayer} from "@deck.gl/layers";
import BitMapLayer from './CesiumMap/NewBitmap/bitmap-layer/bitmap-layer'

export default class CanvasMapLayer extends BitMapLayer {

    constructor(props) {

        console.log(props);

        const params = {

            id: 'bitmap-layer4',

            opacity : 1,

           // coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

            bounds: [-122.5190, 37.7045, -122.355, 37.829],

            image: props.canvas
        };

        super(params);
    }
}
