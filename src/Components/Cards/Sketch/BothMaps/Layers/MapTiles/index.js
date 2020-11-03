import React from 'react';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer, GeoJsonLayer} from "@deck.gl/layers";

export default class MapLayer extends TileLayer {

    constructor(props) {

        const params = {
            data : 'https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=aakE3mPrAw1rSGqy6A3X',

            renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {

                    data: null,
                    image: props.data,
                    opacity : 1,
                    bounds: [west, south, east, north]
                });
            }
        };

        super(params);
    }
}
