import React from 'react';
import {TileLayer} from '@deck.gl/geo-layers';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import { GeoJsonLayer} from "@deck.gl/layers";
import BitMapLayer from '../NewBitmap/bitmap-layer/bitmap-layer'
import GL from '@luma.gl/constants';

export default class CanvasMapLayer extends BitMapLayer {

    constructor(props) {

       console.log(props);

        const params = {

            id: 'bitmap-layer4',

            opacity : 0.7,

            bounds:props.bounds,

            getOrientation : [0,30,0],
            //image: props && props.viewer && props.viewer  ? props.viewer.canvas : '/favicon.ico',
            image: props && props.globeScreenshot ? props.globeScreenshot : '/favicon.ico',

            parameters: {
                depthTest: true,
                depthMask: true,

                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
            }
        };

        super(params);
    }
}
