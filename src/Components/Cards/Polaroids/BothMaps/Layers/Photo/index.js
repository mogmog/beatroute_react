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
            texture : '/textures/squares.jpg',
            xmaterial : {
                ambient: 0.45,
                diffuse: 0.6,
                shininess: 0,
                specularColor: [255, 255, 255]
            }
        })

        return [ material ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';


