
import { Viewport,  FlyToInterpolator, TransitionInterpolator} from '@deck.gl/core';
import { lerp } from 'math.gl';
//import { flyToViewport, getFlyToDuration } from '@math.gl/web-mercator';
const LINEARLY_INTERPOLATED_PROPS = ['zoom'];
const DEFAULT_OPTS = {
    speed: 1.2,
    curve: 1.414
};
export default class Coo extends TransitionInterpolator {
    constructor(props = {}) {
        super({
            compare: ['zoom', 'bearing', 'pitch'],
            extract: ['width', 'height', 'longitude', 'latitude', 'zoom', 'bearing', 'pitch'],
            required: ['width', 'height', 'zoom']
        });
        this.props = Object.assign({}, DEFAULT_OPTS, props);
    }

    interpolateProps(startProps, endProps, t) {
        //const viewport = flyToViewport(startProps, endProps, t, this.props);
        const viewport = {
            zoom : startProps.zoom
        };

        let key = 'zoom';

        //for (const key of Object.keys(viewport)) {
            viewport[key] = lerp(startProps[key] || 0, endProps[key] || 0, t);
        //}

        return viewport;
    }

    getDuration(startProps, endProps) {
        let {
            transitionDuration
        } = endProps;

        return transitionDuration;
    }

}
//# sourceMappingURL=viewport-fly-to-interpolator.js.map
