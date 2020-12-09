import { CompositeLayer } from '@deck.gl/core';
import ArrowSketchLayer from "../ArrowSketchLayer";
import SignaturePad from 'signature_pad';
import {WebMercatorViewport} from '@deck.gl/core';

import {fitBounds} from '@math.gl/web-mercator';

import {draw} from './generator'

import {EditableGeoJsonLayer, DrawPolygonMode, DrawCircleByDiameterMode, DrawPointMode, DrawLineStringMode } from 'nebula.gl';
import * as turf from "@turf/turf";

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: Math.floor(srcWidth*ratio), height: Math.floor(srcHeight*ratio) };
}

export default class ArrowLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    renderLayers() {

        if (this.props.data.features.length ===0) return []; //for when nothing has been drawn

        const onlyFeature = this.props.data.features[0];

        const boundsSmall = turf.bbox(this.props.data);

        const boundsPolygon = turf.bboxPolygon(boundsSmall);

        let a = turf.buffer(boundsPolygon, 50, {units: 'miles'});

        const bounds = turf.bbox(a);

        //        console.log(expandedBounds);

        const bl = this.context.deck.viewManager._viewports[0].project([bounds[0], bounds[1]]);
        const tr = this.context.deck.viewManager._viewports[0].project([bounds[2], bounds[3]]);

        const boundsWidth  = tr[0] - bl[0];
        const boundsHeight = bl[1] - tr[1]

        const {width, height} = calculateAspectRatioFit(boundsWidth, boundsHeight, 4000,4000);
        //get ratio of bounds in pixels

        const {longitude, latitude, zoom} = fitBounds({
            padding : 0,
            width : width,
            height : height,
            bounds : [ [bounds[0], bounds[1]], [bounds[2], bounds[3]] ]});

        const viewport2 = new WebMercatorViewport({
            width: width,
            height: height,
            longitude:longitude,
            latitude: latitude,
            zoom: zoom,
            bearing : this.context.deck.viewManager._viewports[0].bearing
        });

       // console.log(this.context.deck.viewManager._viewports[0].bearing);

         let points = [];

        onlyFeature.geometry.coordinates.forEach((f, i) => {
            let screen = viewport2.project(f) ;
            points.push({x : Math.floor(screen[0]), y : Math.floor(screen[1])});
        });

         //sigdata[0].points  = points;
         //signaturePad.fromData(sigdata);

        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        draw(points, canvas, width, height);

        const arrow = new ArrowSketchLayer({
            opacity : 1,
            id: 'mask-arrow-layer',
            data : this.props.data,
            bounds: bounds,
            image : canvas,
            width, height
        })

        function animate() {
            arrow.setNeedsRedraw(true);
            requestAnimationFrame(animate);
        };

        //animate();

        return [ arrow ];
    }
}
