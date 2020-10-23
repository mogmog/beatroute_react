import React, {useState} from 'react';
import { CompositeLayer } from '@deck.gl/core';

import BitMapLayer from './../NewBitmap/bitmap-layer/bitmap-layer'
import * as turf from "@turf/turf";
import Zdog from 'zdog'

class AnimatedCanvas {

        constructor() {

                this.x= 800;

                this.direction = 1;

                this.canvas = document.createElement('canvas');
                this.canvas.width = 1000;
                this.canvas.height = 1000;
                this.ctx = this.canvas.getContext('2d');

                // create an scene Anchor to hold all items
                this.scene = new Zdog.Anchor({ });

                this.rect = new Zdog.Rect({
                        addTo: this.scene,
                        width: 450,
                        height: 450,
                        stroke: 40,
                        color: '#C25',
                        zoom: 0.4
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

let canvasDisplay = new AnimatedCanvas();

class LabelLayerExample extends BitMapLayer {
        constructor(props) {

                const params = {

                        id: 'bitmap-layer',
                        bounds:[[1, 0, 3], [1, 1, 3], [3, 1, 3], [3, 0, 3]],
                        image : canvasDisplay.canvas,

                        parameters : {
                                blend: true,
                        }
                };

                super(params);
        }
}


class Sketch extends CompositeLayer {

        constructor() {
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

                        canvasDisplay.scene.rotate.x  += 0.1;
                        canvasDisplay.scene.updateGraph();


                }

                requestAnimationFrame(performAnimation);



                return [ sketchlayer];
        }
}

Sketch.layerName= 'Sketch';

export default Sketch;

