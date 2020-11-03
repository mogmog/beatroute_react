import {TerrainLayer} from '@deck.gl/geo-layers';

import React from 'react';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer, GeoJsonLayer} from "@deck.gl/layers";
import {Matrix4} from 'math.gl';


export default class _TerrainLayer extends TerrainLayer {

    constructor(props) {

        const params = {

            elevationDecoder: {
                rScaler:0.02,
                gScaler: 0,
                bScaler: 0,
                offset: 0
            },

            xcoordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            meshMaxError : 4,

            //xmodelMatrix : new Matrix4().makeTranslation(0,12,2 ),
            // Digital elevation model from https://www.usgs.gov/
            elevationData: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain.png',
            texture: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/terrain-mask.png',
            bounds: [-122.5233, 37.6493, -122.3566, 37.8159]
        };

        super(params);
    }
}



