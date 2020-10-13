import React from 'react'

const Rect = ({width, height, round, strokeWidth}) => {
    // overhang over given width and height that we get due to stroke width
    const s = strokeWidth / 2;

    // how many pixels do we need to cut from vertical and horizontal parts
    // due to rounded corners and stroke width
    const over = 2 * round + strokeWidth;

    // lengths of straight lines
    const w = width - over;
    const h = height - over;

    // beware that extra spaces will not be minified
    // they are added for clarity
    const d = `
        M${round + s},${s}
        h${w}
        a${round},${round} 0 0 1 ${round},${round}
        v${h}
        a${round},${round} 0 0 1 -${round},${round}
        h-${w}
        a${round},${round} 0 0 1 -${round},-${round}
        v-${h}
        a${round},${round} 0 0 1 ${round},-${round}
        z
    `;
    return <path d={d} fill="none" stroke="black" strokeWidth={strokeWidth} />;
};


export default Rect;
