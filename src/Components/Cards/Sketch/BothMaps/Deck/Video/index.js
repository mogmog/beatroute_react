import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';

import GL from '@luma.gl/constants';
import rough from 'roughjs/bundled/rough.esm'

export default class VideoBitmapLayer extends BitmapLayer {

    draw(opts) {
        const {image, width} = this.props;
        const {bitmapTexture} = this.state;

        // Update video frame
       // if (image instanceof HTMLVideoElement && image.readyState > HTMLVideoElement.HAVE_METADATA) {
           // bitmapTexture.resize({width: width, height: width});
          //  bitmapTexture.setSubImageData({data: image});
        //}

        super.draw(opts);
    }

    loadTexture(image) {
        super.loadTexture(image);

        if (image instanceof HTMLVideoElement) {
            const {gl} = this.context;

            // Initialize an empty texture while we wait for the video to load
            this.setState({
                bitmapTexture: new Texture2D(gl, {
                    width: 1,
                    height: 1,
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
}
