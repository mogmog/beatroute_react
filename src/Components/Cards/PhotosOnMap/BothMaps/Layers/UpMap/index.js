import React from 'react';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer, GeoJsonLayer} from "@deck.gl/layers";
import {Matrix4} from 'math.gl';
export default class TableMapLayer extends BitmapLayer {

    constructor(props) {

        const params = {

            id: 'bitmap-layer4',

            opacity : 0.6,

            tintColor : [255,0,0],

            modelMatrix : new Matrix4().makeTranslation(0,12,10 ),

            bounds:[[0, 0], [0, 2], [2, 2], [2, 0]],

            image: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-89.902,41.3612,5.23,0/1280x1280@2x?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw'
        };

        super(params);
    }
}
