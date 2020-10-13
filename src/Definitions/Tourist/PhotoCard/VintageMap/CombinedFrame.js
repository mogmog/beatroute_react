import React from 'react';
import * as turf from '@turf/turf/index';
import { CompositeLayer } from '@deck.gl/core';
//import BitmapLayer from './NewBitmap/bitmap-layer/bitmap-layer'
import {BitmapLayer} from '@deck.gl/layers';
import GL from '@luma.gl/constants';
import rough from 'roughjs/bundled/rough.esm'

class BorderDisplay {

    constructor() {

        this.canvas = new OffscreenCanvas(2631, 3096);
        this.ctx = this.canvas.getContext('2d');

        const image = new Image(2631.08, 3096); // Using optional size for image
        image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
        image.src = '/9.svg';

        this.stageConfig = {
            width: 2631.08,
            height: 3096
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;
        //this.gel = new GelCanvas();

        let that = this;
        function drawImageActualSize ()  {
            // Use the intrinsic size of image in CSS pixels for the canvas element
            that.canvas.width = this.naturalWidth;
            that.canvas.height = this.naturalHeight;

            // Will draw the image as 300x227, ignoring the custom size of 60x45
            // given in the constructor
            that.ctx.drawImage(this, 0, 0);

            // To use the custom size we'll have to specify the scale parameters
            // using the element's width and height properties - lets draw one
            // on top in the corner:
            that.ctx.drawImage(this, 0, 0, this.width, this.height);

        }


    }

    animate() {
        //this.ctx.clearRect(0, 0, this.stageConfig.width, this.stageConfig.height);
        //this.gel.update(this.ctx);
        return this;
    }
}

class PhotoDisplay {

    constructor() {
       // console.log(123);
        this.canvas = new OffscreenCanvas(256, 256);
        this.ctx = this.canvas.getContext('2d');

        //const image = new Image(1710, 1719); // Using optional size for image
        //image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
        //image.src = '/California_map.jpg';

        // this.stageConfig = {
        //     width: 1710,
        //     height: 1719
        // };
        //
        // this.canvas.width = this.stageConfig.width;
        // this.canvas.height = this.stageConfig.height;
        //this.gel = new GelCanvas();

        let that = this;
        function drawImageActualSize ()  {
            // Use the intrinsic size of image in CSS pixels for the canvas element
            that.canvas.width = this.naturalWidth;
            that.canvas.height = this.naturalHeight;

            // Will draw the image as 300x227, ignoring the custom size of 60x45
            // given in the constructor
            //that.ctx.drawImage(this, 0, 0);

            // To use the custom size we'll have to specify the scale parameters
            // using the element's width and height properties - lets draw one
            // on top in the corner:
            that.ctx.drawImage(this, 0, 0, this.width, this.height);

        }


    }

    animate() {
        //this.ctx.clearRect(0, 0, this.stageConfig.width, this.stageConfig.height);
        //this.gel.update(this.ctx);
        return this;
    }
}

class TapeDisplay {

    constructor() {

        this.canvas = new OffscreenCanvas(692, 985);
        this.ctx = this.canvas.getContext('2d');

        const image = new Image(692, 985); // Using optional size for image
        image.onload = drawImageActualSize; // Draw when image has loaded

// Load an image of intrinsic size 300x227 in CSS pixels
        image.src = '/textures/tape.png';

        this.stageConfig = {
            width: 692,
            height: 985
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;

        let that = this;
        function drawImageActualSize ()  {
            // Use the intrinsic size of image in CSS pixels for the canvas element
            that.canvas.width = this.naturalWidth;
            that.canvas.height = this.naturalHeight;

            // Will draw the image as 300x227, ignoring the custom size of 60x45
            // given in the constructor
            that.ctx.drawImage(this, 0, 0);

            // To use the custom size we'll have to specify the scale parameters
            // using the element's width and height properties - lets draw one
            // on top in the corner:
            that.ctx.drawImage(this, 0, 0, this.width, this.height);

        }
    }

    animate() {
        return this;
    }
}

class TextDisplay {

    constructor() {

        this.canvas = new OffscreenCanvas(2631, 3096);
        this.ctx = this.canvas.getContext('2d');

        this.stageConfig = {
            width: 2631,
            height: 3096
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;
        //this.gel = new GelCanvas();
        //this.ctx.font = "normal normal 250px InkPen,cursive";
        this.ctx.font = "250px 'Reenie Beanie'";


    }

    setTitle(title) {
        this.ctx.fillStyle = "#232052";  //<===
        this.ctx.fillText( title, 600, 250);
    }

    animate() {
        return this;
    }
}

class SketchDisplay {

    constructor() {

        this.canvas = new OffscreenCanvas(2500, 2500);
        this.ctx = this.canvas.getContext('2d');
        this.x = 0;

        this.stageConfig = {
            width: 2500,
            height: 2500
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;

        this.rc = rough.canvas(this.canvas);

        const that = this;


        requestAnimationFrame(function render(time) {
            const context = that.ctx;
            context.save();
            context.clearRect(0, 0, 2500,2500);
            context.restore();
            that.x = that.x + 1

            that.rc.ellipse(750, 1200, 300, 150, { strokeLineDashOffset : that.x, curveFitting : 0.9, stroke: 'black', strokeWidth : 3, roughness: 1.8, seed : 1 }); // centerX, centerY, width, height

            //hat.rc.path('M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z', { fill: 'purple', seed : 1 });
           // that.rc.line(80, 120, 300, 100, { stroke: 'black', fill: 'blue', seed : 1 }); //

            //that.rc.rectangle(240, that.x, 2500, 2500, { stroke: 'black', fill: 'blue', seed : 1 });

            requestAnimationFrame(render);
        });

    }

}

let borderDisplay   = new BorderDisplay();
let photoDisplay    = new PhotoDisplay();
let tapeDisplay     = new TapeDisplay();
let titleDisplay    = new TextDisplay();
let sketchDisplay   = new SketchDisplay();

const paper = new BitmapLayer({
    id: 'bitmap-layer2',
    bounds: [0, 5, 5, 0],
    image: '/paper4.jpg',


});

class FrameLayer extends BitmapLayer {

    constructor(props) {

        const center = turf.point(props.center);

        var radius = 8700;
        var options = {units: 'meters' };
        var circle = turf.circle(center, radius, options);

        const [left, bottom, right, top] = turf.bbox(circle);

        const params = {

            id: 'frame-layer',
            bounds:   [[left, bottom, props.altitude], [left, top,props.altitude], [right, top,props.altitude], [right, bottom,props.altitude]],
            image: borderDisplay.canvas,
            opacity : 0.9,
            parameters : {
                blend: true,
                depthTest: false
            }
        };

        super(params);
    }
}

class SketchLayer extends BitmapLayer {

    constructor(props) {

        const center = turf.point(props.center);

        var radius = 12700;
        var options = {units: 'meters' };
        var circle = turf.circle(center, radius, options);

        const [left, bottom, right, top] = turf.bbox(circle);

        const params = {

            id: 'sketch-layer' + props.id,
            bounds:   [[left, bottom, props.altitude], [left, top,props.altitude], [right, top,props.altitude], [right, bottom,props.altitude]],
            image: sketchDisplay.canvas,
            opacity : 1,
            parameters : {
                blend: true,
                depthTest: false
            }
        };

        super(params);
    }
}

class PhotoLayer extends BitmapLayer {

    constructor(props) {

        const center = turf.point(props.center);

        var radius = 8700;
        var options = {units: 'meters' };
        var circle = turf.circle(center, radius, options);

        const [left, bottom, right, top] = turf.bbox(circle);

        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = '1400';
        offScreenCanvas.height = '1400';
        var context = offScreenCanvas.getContext("2d");
        context.fillStyle = 'orange'; //set fill color
        context.fillRect(10, 10, 200, 800);

        //const canvas = new OffscreenCanvas(256, 256);
        //const  ctx = canvas.getContext('2d');

//console.log([[left, bottom, props.altitude], [left, top,props.altitude], [right, top,props.altitude], [right, bottom,props.altitude]]);

        const params = {

            id: 'photox-layer',
            bounds:   [[left, bottom, props.altitude], [left, top,props.altitude], [right, top,props.altitude], [right, bottom,props.altitude]],
            image: offScreenCanvas,
            opacity: 0.6,
            parameters : {
                blend: true,
                depthTest: false,
                depthMask: true,


                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
            }
        };

        super(params);
    }
}

class TapeLayer extends BitmapLayer {

    constructor(props) {

        const center = turf.point(props.center);

        const a = turf.destination(center, 11000,         props.bearing || 0, {units: 'meters'});

        var radius = 3200;
        var options = {units: 'meters' };
        var circle = turf.circle(a, radius, options);


        //console.log(a);

        // [minX, minY, maxX, maxY]
       // const bounds = turf.bbox(a);

        const [left, bottom, right, top] = turf.bbox(circle);

        // let left = bounds[0];
        // let right = bounds[2];
        // let top = bounds[3];
        // let bottom = bounds[1];
        //
        // console.log(bounds);

        const params = {

            id: 'tape-layer',
           // boundsXX : bounds,
           // bounds: [-122.5190, 37.7045, -122.355, 37.829],
            bounds: [[left, bottom, props.altitude], [left, top, props.altitude], [right, top, props.altitude], [right, bottom,props.altitude]],
            image: tapeDisplay.canvas,
            opacity: 0.8,

            parameters : {
                blend: true,
                depthTest: false
            }
        };

        super(params);
    }
}

class TitleLayer extends BitmapLayer {

    constructor(props) {

        const center = turf.point(props.center);

        var radius = 8700;
        var options = {units: 'meters' };
        var circle = turf.circle(center, radius, options);

        const [left, bottom, right, top] = turf.bbox(circle);

        titleDisplay.setTitle(props.title);
        const params = {
            opacity: 0.7,
            id: 'title-layer',
            bounds:   [[left, bottom, props.altitude], [left, top,props.altitude], [right, top,props.altitude], [right, bottom,props.altitude]],
            image: titleDisplay.canvas,

            parameters : {
                blend: true,
                depthTest: false
            }
        };

        super(params);
    }
}

export default class Combined extends CompositeLayer {
    initializeState() {

        let self = this;

        this.setState({
            altitude : 0
        });
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  image, out, center, title } = this.props;

        const border    = new FrameLayer({ altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });

        const sketch     = new SketchLayer({ id : 1, altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });
        const sketch2    = new SketchLayer({ id : 2, altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });

        const photo    = new PhotoLayer({ altitude : altitude, out, center, image, cameraBearing : cameraBearing  });
        const titlel     = new TitleLayer({ title, altitude : 0, out, center, image, cameraBearing : cameraBearing  });
        const tapeTL     = new TapeLayer({ title, bearing : 360-45, altitude : altitude, out, center, image, cameraBearing : cameraBearing  });
        //const tapeTR     = new TapeLayer({ title, bearing : 180-45, altitude : altitude, out, center, image, cameraBearing : cameraBearing  });

        return [ paper  ];
    }
}
