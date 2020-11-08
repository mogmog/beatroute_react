import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';

export default class MaskLayer extends CompositeLayer {
    initializeState() {

        let self = this;

        this.setState({
            altitude : 0,
            bounds : null
        });
    }

    shouldUpdateState({ changeFlags }) {

        const tl = (this.context.deck.viewManager._viewports[0].unproject([0,300],      {topLeft : false}));
        const tr = (this.context.deck.viewManager._viewports[0].unproject([500,300],    {topLeft : false}));
        const bl = (this.context.deck.viewManager._viewports[0].unproject([0,0],        {topLeft : false}));
        const br = (this.context.deck.viewManager._viewports[0].unproject([500,0],      {topLeft : false}));

        this.setState({
            bounds : [bl, tl, tr, br  ]
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

        const layer = new BitmapLayer({
            id: 'mask-bitmap-layer',
            bounds: this.state.bounds,
            image: './textures/paper-inverted.png',

        });

        const tilelayer= new TileLayer({
            // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
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
                    parameters: {
                        depthTest: true,
                        depthMask: true,

                        blend: true,
                        blendEquation: GL.FUNC_ADD,
                        blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
                    }
                });
            }
        });

        //const border    = new FrameLayer({ altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });

        //const sketch     = new SketchLayer({ id : 1, altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });
        //const sketch2    = new SketchLayer({ id : 2, altitude : 0.5, out, center, image, cameraBearing : cameraBearing  });

        //const photo    = new PhotoLayer({ altitude : altitude, out, center, image, cameraBearing : cameraBearing  });
        //const titlel     = new TitleLayer({ title, altitude : 0, out, center, image, cameraBearing : cameraBearing  });
        // const tapeTL     = new TapeLayer({ title, bearing : 360-45, altitude : altitude, out, center, image, cameraBearing : cameraBearing  });
        //const tapeTR     = new TapeLayer({ title, bearing : 180-45, altitude : altitude, out, center, image, cameraBearing : cameraBearing  });

        return [ layer, tilelayer  ];
    }
}
