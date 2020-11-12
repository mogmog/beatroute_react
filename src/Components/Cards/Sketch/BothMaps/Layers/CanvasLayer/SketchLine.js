import rough from 'roughjs/bundled/rough.esm'

export default class SketchLineCanvas {

    constructor() {

        this.direction = 1;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        this.ctx = this.canvas.getContext('2d');

        this.rc = rough.canvas(this.canvas);

        //this.ctx.beginPath();

        let fpsInterval, then, startTime, now, elapsed;

        this.startAnimating = (fps) => {

           // console.log("test");
            let that = this;

            this.drawing = rough.generator().ellipse(500, 500, 500, 300, {  stroke: 'black', strokeWidth : 10000, roughness: 1.2 });

            that.ctx.globalCompositeOperation = 'source-over';
            //that.ctx.globalAlpha = 1;
            that.ctx.lineWidth =5; // Draw it

            this.ctx.beginPath();

            let fpsInterval, then, startTime, now, elapsed;

           // let that = this;
            let frameCount= 25;

            for (const item of that.drawing.sets[0].ops) {
                const data = item.data;
                switch (item.op) {
                    case 'move':
                        that.ctx.moveTo(data[0], data[1]);
                        break;
                    case 'bcurveTo':
                        that.ctx.bezierCurveTo(data[0], data[1], data[2], data[3], data[4], data[5]);
                        break;
                    case 'lineTo':
                        that.ctx.lineTo(data[0], data[1]);
                        break;
                }
            }

            that.ctx.stroke(); // Draw it
            that.ctx.closePath();

        }

        // this.animate = () => {
        //      that.ctx.fillStyle = "blue";
        //      that.ctx.fillRect(0, 0,   that.direction, that.canvas.height);
        //
        //      that.req = requestAnimationFrame(this.animate);
        //      now = Date.now();
        //
        //      elapsed = now - then;
        //
        //     if (elapsed > fpsInterval) {
        //
        //         // Get ready for next frame by setting then=now, but...
        //         // Also, adjust for fpsInterval not being multiple of 16.67
        //         then = now - (elapsed % fpsInterval);
        //
        //         var sinceStart = now - startTime;
        //         var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        //
        //         //that.direction = that.direction+1;
        //
        //
        //
        //         that.ctx.lineWidth = "5";
        //         that.ctx.strokeStyle = "green"; // Green path
        //
        //
        //
        //
        //         //that.ctx.fillRect(0, 0, that.x, 50);
        //
        //     }
        //
        // }

    }
}

