import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import InkLayer from "../Ink";

export default class MaskLayer extends CompositeLayer {
    initializeState() {

        let self = this;

        this.setState({
            altitude : 0,
            bounds : null
        });
    }

    shouldUpdateState({ changeFlags }) {

        //lock the mask to the bounds of the 500x300 container
        const tl = (this.context.deck.viewManager._viewports[0].unproject([0,300],      {topLeft : false}));
        const tr = (this.context.deck.viewManager._viewports[0].unproject([500,300],    {topLeft : false}));
        const bl = (this.context.deck.viewManager._viewports[0].unproject([0,0],        {topLeft : false}));
        const br = (this.context.deck.viewManager._viewports[0].unproject([500,0],      {topLeft : false}));

        this.setState({
            bounds : [ bl, tl, tr, br ]
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
            image: './textures/paper-inverted.png',
            parameters: {
                depthTest: true,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
            }

        });

        const tilelayer= new TileLayer({
            data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',

            minZoom: 0,
            maxZoom: 19,
            tileSize: 256,

            renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north],

                });
            }
        });

        const ink = new InkLayer({
            data: this.props.data,
            width: this.props.width,
            onEdit: this.props.set,
        })

        return [ tilelayer ,ink, papermasklayer ];
    }
}