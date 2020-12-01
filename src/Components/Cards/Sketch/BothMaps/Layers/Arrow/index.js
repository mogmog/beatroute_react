import { CompositeLayer } from '@deck.gl/core';
import ArrowSketchLayer from "../ArrowSketchLayer";
import SignaturePad from 'signature_pad';
import {WebMercatorViewport} from '@deck.gl/core';

import {fitBounds} from '@math.gl/web-mercator';

import {EditableGeoJsonLayer, DrawPolygonMode, DrawCircleByDiameterMode, DrawPointMode, DrawLineStringMode } from 'nebula.gl';
import * as turf from "@turf/turf";

let sigdata = [{
    color: "rgb(219,187,36)",
    points: [{
        time: 1606768803491,
        x: 0,
        y: 109.828125
    }, {
        time: 1606768803604,
        x: 250.02734375,
        y: 124.1484375
    },  {
        time: 1606768803700,
        x: 263.7890625,
        y: 430.6796875
    }]
}];

export default class ArrowLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    renderLayers() {

        if (this.props.data.features.length ===0) return []; //for when nothing has been drawn

        const onlyFeature = this.props.data.features[0];

        var canvas = document.createElement('canvas');
        canvas.width = 1280;
        canvas.height = 1020;

        const bounds = turf.bbox(this.props.data);

        const {longitude, latitude, zoom} = fitBounds({
            width : 1280,
            height : 1020,
            bounds : [ [bounds[0], bounds[1]], [bounds[2], bounds[3]] ]});

        const viewport2 = new WebMercatorViewport({
            width: 1280,
            height: 1020,
            longitude:longitude,
            latitude: latitude,
            zoom: zoom,
        });

        var signaturePad = new SignaturePad(canvas,  {
            minWidth: 20.5,
           // minDistance : 1,
            throttle : 0,
            //velocityFilterWeight : 0.5,
            maxWidth: 48,
            penColor: "rgb(66, 133, 244)"
        });

        let points = [];

        onlyFeature.geometry.coordinates.forEach((f, i) => {
            let screen = viewport2.project(f) ;
            points.push({x : screen[0], y : screen[1], time : 1606768803491 + (i * 500)});
        });

        sigdata[0].points  = points;

        signaturePad.fromData(sigdata);

        const arrow = new ArrowSketchLayer({
            opacity : 1,
            id: 'mask-arrow-layer',
            data : this.props.data,
            bounds: bounds,
            //image  : 'https://i.imgur.com/kvgFq.jpg'//signaturePad.canvas
            image : signaturePad.canvas
        })

        function animate() {
            arrow.setNeedsRedraw(true);
            requestAnimationFrame(animate);
        };

        //animate();

        return [ arrow ];
    }
}
