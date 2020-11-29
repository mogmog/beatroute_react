import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, TextLayer} from "@deck.gl/layers";
import { Model, Geometry, Texture2D } from '@luma.gl/core';
import  rough from 'roughjs/bundled/rough.esm';

const { fabric } = window;
const width = 1000;



export default class ArrowSketchLayer extends BitmapLayer {

    draw(opts) {
        const { } = this.props;
        const {image, bitmapTexture} = this.state;

       if (image) {
           bitmapTexture.setSubImageData({data: image.toCanvasElement()});
        }

        super.draw(opts);
    }

    loadTexture() {

        function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            return { width: Math.floor(srcWidth*ratio), height: Math.floor(srcHeight*ratio) };
        }

        const result = calculateAspectRatioFit(this.props.width, this.props.height, 2500,2500);

        let {width, height} = result;    // Current image width

        let generator = rough.generator({}, { width: width, height: height });

        let canvas = new fabric.StaticCanvas('c');

        canvas.setHeight(height);
        canvas.setWidth(width);

        let pathh = ['M 0 0 '];
        //assume just 1 line string for now
        this.props.data.features[0].geometry.coordinates.forEach(c => {
            let a = this.context.deck.viewManager._viewports[0].project(c);

            let px = a[0] - this.props.tl;
            let py = this.props.bl - a[1];

            let adjustedPx = px/this.props.mapWidthOfBoundsInPixels * width;
            let adjustedPy = py/this.props.height * height;

            pathh.push(`L ${adjustedPx} ${adjustedPy}`)

        });

        console.log(pathh.join(' '));

        let rect = generator.rectangle(0, 0, width, height, {fill: 'none'});
        let paths = generator.toPaths(rect);

       // let path = new fabric.Path(paths[0].d);
        let path = new fabric.Path(pathh.join(' '));

        path.set({ stroke: 'red', fill: false, strokeWidth: 10 });

        canvas.add(path);

        super.loadTexture(canvas.toCanvasElement());

            const {gl} = this.context;

            this.setState({
                image : canvas,
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
