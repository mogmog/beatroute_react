import rough from 'roughjs/bundled/rough.esm'
import Canvg from "canvg";

export default class SketchLineCanvas {

    constructor() {

        this.direction = 1;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');

        this.v = Canvg.from(this.ctx, './textures/drawing.svg');

    }
}

