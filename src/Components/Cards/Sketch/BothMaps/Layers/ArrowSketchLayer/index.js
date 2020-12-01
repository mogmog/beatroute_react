import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';
import  rough from 'roughjs/bundled/rough.esm';

const { fabric } = window;
const width = 1280, height =  1020;

export default class ArrowSketchLayer extends BitmapLayer {

    draw(opts) {
        const { } = this.props;
        const {image, bitmapTexture} = this.state;

        if (true && image) {
            bitmapTexture.setSubImageData({data: image
            });
        }

        super.draw(opts);
    }

    loadTexture(image) {


        //  let generator = rough.generator({}, { width: width, height: height });
        // //
        //  let canvas = new fabric.StaticCanvas('c');
        // //
        // // canvas.setHeight(height);
        // // canvas.setWidth(width);
        // //
        // //
        //  let rect = generator.rectangle(0, 0, width, height, {fill: 'none'});
        //  let paths = generator.toPaths(rect);
        // //
        //  let path = new fabric.Path(paths[0].d);
        // //
        // // //let path = new fabric.Path(pathh.join(' '));
        // //
        //  path.set({ stroke: 'red', fill: false, strokeWidth: 10 });
        // //
        //  canvas.add(path);

        //super.loadTexture(canvas.toCanvasElement());

        const {gl} = this.context;

        this.setState({
            image : image,
            bitmapTexture: new Texture2D(gl, {
                width: width,
                height: height,
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
