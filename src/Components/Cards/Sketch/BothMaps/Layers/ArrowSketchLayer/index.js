import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';
import  rough from 'roughjs/bundled/rough.esm';

const { fabric } = window;
//const width = 1280, height =  600;

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

        const {width, height} = this.props;
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
