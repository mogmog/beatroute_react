import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import GL from '@luma.gl/constants';
import {CustomGeometry} from "./CustomGeometry";

const materialLayoutData = [
    {position: [-10, -10, 0.0], angle : 5},
];

const plane = new CustomGeometry({size : 1, m : 1.03, holed  : false});

export default class PolaroidAndPhotoLayer extends CompositeLayer {

    initializeState() {

        let self = this;

    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  data, id } = this.props;



        return [

            new SimpleMeshLayer({
                id: 'photo' + id,
                getOrientation: d => [0, d.angle,0],
                getTranslation : [15,15,0],
                getScale: [78,78,1],
                opacity: 1,
                data : data,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/textures/bird.png',
                material : {
                    ambient: 0.45,
                    diffuse: 0.8,
                    shininess: 0.1,
                    specularColor: [255, 255, 255]
                },

            }),

            new SimpleMeshLayer({
                id: 'polaroid' + id,
                getOrientation: d => [0, d.angle,0],
                getScale: [109,109,1],
                opacity: 1,
                data : data,
                mesh: plane,
                getPosition: d => d.position,
                texture : '/textures/polaroid1.png',
                material : {
                    ambient: 1,
                    diffuse: 0.5,
                    shininess: 0.5,
                    specularColor: [255, 255, 255]
                },
                parameters: {
                    depthTest: true,
                    depthMask: true,
                    blend: true,
                    blendEquation: GL.FUNC_ADD,
                    blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                }
            }),

        ];
    }
}

PolaroidAndPhotoLayer.componentName = 'PolaroidAndPhotoLayer';
