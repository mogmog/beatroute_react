import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';

import GL from '@luma.gl/constants';
import rough from 'roughjs/bundled/rough.esm'

export default class CanvasLayer extends BitmapLayer {

    draw(opts) {
        const {image, width} = this.props;
        const {bitmapTexture} = this.state;


        //console.log(123);
        // Update video frame
       if (image) {
           //bitmapTexture.resize({width: width, height: width});
           bitmapTexture.setSubImageData({data: image.canvas});
        }

        super.draw(opts);
    }

    loadTexture(image) {

        super.loadTexture(image.canvas);

        image.startAnimating(25);
        //image.startAnimating(25);
        //image.startAnimating(25);

        // if (image instanceof HTMLVideoElement) {
            const {gl} = this.context;
        //
        //     // Initialize an empty texture while we wait for the video to load
            this.setState({
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
