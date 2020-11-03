import rough from 'roughjs/bundled/rough.esm'
import Zdog from 'zdog'

export default class AnimatedCanvas {

    constructor() {

        this.direction = 1;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.ctx = this.canvas.getContext('2d');

        this.rc = rough.canvas(this.canvas);

        //this.ctx.fillStyle = "blue";
        //this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.rc.ellipse(500, 500, 200, 100, { curveFitting : 0.9, stroke: 'black', strokeWidth : 2, roughness: 1.8, seed : 1 }); // centerX, centerY, width, height



    }



}
