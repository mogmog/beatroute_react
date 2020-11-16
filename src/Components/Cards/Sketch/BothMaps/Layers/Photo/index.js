import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {COORDINATE_SYSTEM} from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {Matrix4} from 'math.gl';
import * as turf from '@turf/turf/index';

import {CustomGeometry} from "../../../Map/CustomGeometry";

const plane = new CustomGeometry({size : 50, holed  : false});

const materialLayoutData = [
    {position: [0, 10, 0.0]},
];

export default class PhotoLayer extends CompositeLayer {

    initializeState() {
        let self = this;
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    renderLayers() {

        const  material =new SimpleMeshLayer({
            id: 'photo',
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            opacity: 1,
            data : materialLayoutData,
            mesh: plane,
            getPosition: d => d.position,
           // getOrientation : [180,180,180],
            //getRotation : [180,180,180],
            //getTranslation: [ 0, 0, 0.0 ],
            texture : '/textures/squares.jpg',
            xmaterial : {
                ambient: 0.45,
                diffuse: 0.6,
                shininess: 0,
                specularColor: [255, 255, 255]
            }
        })

        //var point = turf.polygon(this.props.bounds);
        //var buffered = turf.buffer(point, 500, {units: 'miles'});

        // let line = turf.lineString([[this.props.bounds[0], this.props.bounds[1]], [this.props.bounds[2], this.props.bounds[3]]]);
        // let bbox = turf.bbox(line);
        // let bboxPolygon = turf.bboxPolygon(bbox);
        //
        // const shrunk = turf.buffer(bboxPolygon, -3.056, {units: 'miles'})
        // let translatedPoly = turf.transformTranslate(shrunk, 0.36, 0);
        // translatedPoly = turf.transformTranslate(translatedPoly, 0.08, 90);

        // const layer2 = new BitmapLayer({
        //     id: 'photocard' + this.props.id,
        //     bounds: this.props.bounds,
        //     image: this.props.image
        // })

        return [ material ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';


