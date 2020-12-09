var isDrawing, lastPoint, nextPoint;
let arrowLength = 60;
let arrowAngle = 30;

export function draw(data, canvas, width, height) {

    var ctx = canvas.getContext('2d')
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#db7411";
    ctx.globalAlpha = 0.8;
    // move to the first point
    ctx.moveTo(data[0].x, data[0].y);

    let points = data;
    //ctx.moveTo((points[0].x), points[0].y);

    for(var i = 0; i < points.length-1; i ++)
    {

        var x_mid = (points[i].x + points[i+1].x) / 2;
        var y_mid = (points[i].y + points[i+1].y) / 2;
        var cp_x1 = (x_mid + points[i].x) / 2;
        var cp_x2 = (x_mid + points[i+1].x) / 2;
        ctx.quadraticCurveTo(cp_x1,points[i].y ,x_mid, y_mid);
        ctx.quadraticCurveTo(cp_x2,points[i+1].y ,points[i+1].x,points[i+1].y);

        //ctx.moveTo(points[i].x, points[i].y);
        //ctx.lineTo(points[i].x, points[i].y);

    }

    ctx.stroke();

    // draw arrow
    let lineAngle = angle(data[1].x, data[1].y, data[0].x, data[0].y);
    let x1 = Math.cos((lineAngle + arrowAngle) * Math.PI / 180) * arrowLength + data[1].x;
    let y1 = Math.sin((lineAngle + arrowAngle) * Math.PI / 180) * arrowLength + data[1].y;

    let x2 = Math.cos((lineAngle - arrowAngle) * Math.PI / 180) * arrowLength + data[1].x;
    let y2 = Math.sin((lineAngle - arrowAngle) * Math.PI / 180) * arrowLength + data[1].y;

    ctx.lineWidth = 10;

    //drawLine (data[1], {x: x1, y: y1}, ctx);
    //drawLine (data[1], {x: x2, y: y2}, ctx);
}

function drawLine (lastPoint, nextPoint, ctx) {

    ctx.beginPath();

    ctx.globalAlpha = 1.0;
    ctx.moveTo(lastPoint.x - 4, lastPoint.y - 4);
    ctx.lineTo(nextPoint.x - 4, nextPoint.y - 4);
    ctx.stroke();

    ctx.globalAlpha = 0.6;
    ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
    ctx.lineTo(nextPoint.x - 2, nextPoint.y - 2);
    ctx.stroke();

    ctx.globalAlpha = 0.4;
    ctx.moveTo(lastPoint.x - 2, lastPoint.y - 2);
    ctx.lineTo(nextPoint.x - 2, nextPoint.y - 2);
    ctx.stroke();

    //
    // ctx.globalAlpha = 0.4;
    // ctx.moveTo(lastPoint.x, lastPoint.y);
    // ctx.lineTo(ctx.x, ctx.y);
    // ctx.stroke();

};

function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
}
