import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import InkLayer from "../Ink";
import Arrow from "../Arrow";
import EditableLayer from "../Editable";

export default class MaskLayer extends CompositeLayer {

    initializeState() {

        let self = this;

        this.setState({
            altitude : 0,
            bounds : null
        });
    }

    shouldUpdateState({ changeFlags }) {

        const height = this.props.width;
        //lock the mask to the bounds of the 500x600 container
        const tl = (this.context.deck.viewManager._viewports[0].unproject([0, height],      {topLeft : false}));
        const tr = (this.context.deck.viewManager._viewports[0].unproject([this.props.width, height],    {topLeft : false}));
        const bl = (this.context.deck.viewManager._viewports[0].unproject([0,0],        {topLeft : false}));
        const br = (this.context.deck.viewManager._viewports[0].unproject([this.props.width,0],      {topLeft : false}));

        this.setState({
            bounds : [ bl, tl, tr, br ],
        });

        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  image, out, center, title } = this.props;

        if (!this.state.bounds) return [];

        const papermasklayer = new BitmapLayer({
            id: 'mask-bitmap-layer',
            bounds: this.state.bounds,
            image: './textures/hand-map-mask-04.png',
            parameters: {
                depthTest: true,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
            }

        });

        const handslayer = new BitmapLayer({
            id: 'mask-bitmap-layer',
            bounds: this.state.bounds,
            image: './textures/hands-map-05.png',
        });

        const editable = new EditableLayer({
            data: this.props.data,
            onEdit : this.props.onEdit,
            selectedFeatureIndexes : this.props.selectedFeatureIndexes
        });

        const tilelayer= new TileLayer({
            id : 'mask-tile',
            data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',

            minZoom: 0,
            maxZoom: 19,
            tileSize: 256,

            renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {
                    data: null,
                    desaturate : 1,
                    opacity : 1.0,
                    //tintColor :  [100, 0, 0, 100],
                    image: props.data,
                    bounds: [west, south, east, north],

                });
            }
        });

        const ink = new InkLayer({
            id : 'mask-ink',
            data: this.props.data,
        })

        const arrows = this.props.data.features.map((f, i) => new Arrow({
            id : 'mask-inklines' + i,
            data: f,
            bounds: this.state.bounds,
            canvas : this.props.canvas
        }));


        return [  tilelayer, editable].concat(arrows).concat([papermasklayer, handslayer]);
    }
}

MaskLayer.componentName = 'MaskLayer';
