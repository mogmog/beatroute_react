import {BitmapLayer } from "@deck.gl/layers";
import { Texture2D } from '@luma.gl/core';

export default class CanvasLayer extends BitmapLayer {

    draw(opts) {

        const {image, bitmapTexture} = this.state;

        if (true && image) {
            bitmapTexture.setSubImageData({data: image});
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
