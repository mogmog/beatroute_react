import {BitmapLayer} from '@deck.gl/layers';
import {Texture2D} from '@luma.gl/webgl';

export default class VideoBitmapLayer extends BitmapLayer {

    draw(opts) {
        const {image} = this.props;
        const {bitmapTexture} = this.state;

        // Update video frame
        if (image instanceof HTMLCanvasElement) {
            bitmapTexture.resize({width: image.width, height: image.height});
            bitmapTexture.setSubImageData({data: image});
        }

        super.draw(opts);
    }

    loadTexture(image) {
        super.loadTexture(image);

        if (image instanceof HTMLCanvasElement) {
            const {gl} = this.context;

            // Initialize an empty texture while we wait for the video to load
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
}
