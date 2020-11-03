import React from 'react';
import {TileLayer} from '@deck.gl/geo-layers';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer} from "@deck.gl/layers";

export default class TableMapLayer extends BitmapLayer {

    constructor(props) {

        const params = {

            id: 'bitmap-layer2',

            opacity : 1,

            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,

            bounds:[[0, 0], [0, 10], [10, 10], [10, 0]],

            image: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-89.902,41.3612,5.23,0/1280x1280@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw'
        };

        super(params);
    }
}
