import React, {useState} from 'react';

import GL from '@luma.gl/constants';
import rough from 'roughjs/bundled/rough.esm'
import { CompositeLayer } from '@deck.gl/core';

import { GeoJsonLayer} from "@deck.gl/layers";

import BitMapLayer from './../../../../../../MapMaker/Layers/NewBitmap/bitmap-layer/bitmap-layer'
import * as turf from "@turf/turf";

import Zdog from 'zdog'
import Zfont from 'zfont';

Zfont.init(Zdog);

class CanvasDisplay {

        constructor() {

                this.x= 800;

                //this.canvas = canvas;

                this.direction = 1;

                this.canvas = document.createElement('canvas');
                this.canvas.width = 1000;
                this.canvas.height = 1000;
                this.ctx = this.canvas.getContext('2d');



// illustration variables
                const TAU = Zdog.TAU;
                const zoom = 4;
                let isSpinning = true;

                // Set up a font to use
                var font = new Zdog.Font({
                        src: 'https://cdn.jsdelivr.net/gh/jaames/zfont/demo/fredokaone.ttf'
                });

// create an scene Anchor to hold all items
                this.scene = new Zdog.Anchor();

                // this.rect = new Zdog.Rect({
                //         addTo: this.scene,
                //          width: 450,
                //          height: 450,
                //          stroke: 40,
                //          color: '#C25',
                // });

                this.text = new Zdog.Text({
                        addTo: this.scene,
                        font: font,
                        value: "Hey, Zdog!",
                        fontSize: 200,
                        textAlign: 'center',
                        textBaseline: 'middle',
                        color: '#fff',
                        fill: true,
                });

                this.shadow = this.text.copy({
                        addTo: this.scene,
                        translate: {  z : 200},
                        color: '#000000',
                });


                var sceneSize = 80;
// colors
                var pink = '#F8B';
                var blush = '#F5A';
                var black = '#333';
                var shoe = '#D03';
                var red = '#E10';
                var yellow = '#FD0';





                this.body = new Zdog.Shape({
                        stroke: 220,
                        translate: { y: 11 },
                        rotate: { x: 0.3, z: 0.1 },
                        addTo: this.scene,
                        color: pink,
                });






        }

        drawIt()  {

                var ctx = this.canvas.getContext('2d');

                ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

                ctx.save();
                // center canvas & zoom
                ctx.translate( this.canvas.width/2, this.canvas.height/2 );
                 ctx.scale( 1, 1 );
                // set lineJoin and lineCap to round
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                // render scene graph
                this.scene.renderGraphCanvas( ctx );
                ctx.restore();

        }

}

let canvasDisplay = new CanvasDisplay();

class LabelLayerExample extends BitMapLayer {
        constructor(props) {

                const position = [
                        -0.01162985922723692,
                        51.503526455067814
                ]

                const center = turf.center(turf.point(position));

                const getPos = (pos, i, bearing, altitude) => {
                        const test = turf.destination(pos, i, bearing, {units: 'meters'});
                        return [test.geometry.coordinates[0],  test.geometry.coordinates[1], altitude]
                }

                /*    _______
                     /______/|
                   b|      |c|
                    |      | |
                    |      | /
                    |______|/
                   a    |  d
                        |
                        |
                        |
                        |
                        \/
                   [lat, long]

                    This code created a 'billboard' floating above a point with positions [a,b,c,d] determined by turf
                */
//
                //       debugger;

                const a = getPos(center, -250,   90,     200)
                const b = getPos(center, -250,   90,     700)
                const c = getPos(center,  250,   90,     700)
                const d = getPos(center,   250  ,   90,  200)



                const params = {

                        id: 'bitmap-layer',
                        bounds: [a, b, c, d],
                        image : canvasDisplay.canvas,//;;'logo192.png',

                        parameters : {
                                blend: true,
                        }
                };

                super(params);
        }
}


class Sketch extends CompositeLayer {

        constructor() {

                const position = [
                        -0.01162985922723692,
                        51.503526455067814
                ]

                const center = turf.center(turf.point(position));

                const getPos = (pos, i, bearing, altitude) => {
                        const test = turf.destination(pos, i, bearing, {units: 'meters'});
                        return [test.geometry.coordinates[0],  test.geometry.coordinates[1], altitude]
                }

                super();

        }

        renderLayers() {
                const { } = this.state;
                const { data, id} = this.props;

                const sketchlayer = new LabelLayerExample();



                const performAnimation = () => {
                       requestAnimationFrame(performAnimation)
                        //console.log(this.context.viewport.pitch);
                        canvasDisplay.drawIt();

                       // canvasDisplay.scene.rotate.x =  this.context.viewport.pitch;
                        //canvasDisplay.scene.rotate.y +=  0.05;
                        //canvasDisplay.scene.rotate.y +=  0.05;

                        //canvasDisplay.cylinder.scale.x = 0.8;
                        //canvasDisplay.cylinder.scale.y = 0.8;

                        //canvasDisplay.cylinder.rotate.y  = 2.1;
                        //canvasDisplay.cylinder.rotate.y  += 0.03;

                        //rotate: { x: TAU/4 },

                        canvasDisplay.scene.updateGraph();

                       // sketchlayer.setNeedsRedraw(true);

                }

                requestAnimationFrame(performAnimation);



                return [ sketchlayer];
        }
}

Sketch.layerName= 'Sketch';

export default Sketch;

