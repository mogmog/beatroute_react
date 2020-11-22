import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';

const { fabric } = window;

export default class CanvasLayer extends BitmapLayer {

    draw(opts) {
        const { width} = this.props;
        const {image, bitmapTexture} = this.state;

       if (image) {
           bitmapTexture.setSubImageData({data: image.toCanvasElement()});
        }

        super.draw(opts);
    }

    loadTexture() {

        let canvas = new fabric.StaticCanvas('c');
        canvas.setHeight(1000);
        canvas.setWidth(1000);

        let path = new fabric.Path('M 150 150 Q 200 100 350 100 Q 450 100 500 150 Q 550 250 500 350 C 450 400 400 450 300 450 C 150 450 150 400 100 350 A 50 50 0 1 1 500 250');

        path.set({ 	fill: ' rgba(255, 255, 255, 0)',
            stroke: '#000',
            strokeDashArray: [2000, 2000],
            strokeDashOffset: 2000,
            strokeWidth: 10
        });

        canvas.add(path);

        //let tt = super;

        path.animate('strokeDashOffset', 0, {
            onComplete: function() {
                //super.loadTexture(canvas.toCanvasElement());
            },

            onChange: (i) => {


                //console.log(this);
                this.setNeedsRedraw(true);
                //console.log("progress");

                //canvas.renderAll.bind(canvas)
            },
            easing: fabric.util.ease.easeInExpo,
            duration: 300
        });

       // console.log(123);

        super.loadTexture(canvas.toCanvasElement());

            const {gl} = this.context;

            this.setState({
                image : canvas,
                bitmapTexture: new Texture2D(gl, {
                    width: 1000,
                    height: 1000,
                    parameters: {
                        [gl.TEXTURE_MIN_FILTER]: gl.NEAREST,
                        [gl.TEXTURE_MAG_FILTER]: gl.NEAREST,
                        [gl.TEXTURE_WRAP_S]: gl.CLAMP_TO_EDGE,
                        [gl.TEXTURE_WRAP_T]: gl.CLAMP_TO_EDGE
                    },
                    mipmaps: false
                })
            });
        }

}
