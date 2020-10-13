import React, {useEffect, useRef, useState, useLayoutEffect} from 'react';
//import { hot } from 'react-hot-loader/root';
import { Scene, Globe, Viewer, WallGraphics, ImageryLayer, PostProcessStage, Fog, Entity, CameraFlyTo, BlackAndWhiteStage } from 'resium';
import { createWorldTerrain, Cartesian3 } from 'cesium';
import { ArcGisMapServerImageryProvider, IonImageryProvider , Color} from "cesium";
import {Button} from 'antd';
import MapMaker from '../../../../../MapMaker';
//import CameraFlyTo from "../CameraFlyTo";
import CanvasMapLayer from "../canvasmap";
import { useCesium } from "resium";
import BitmapLayer from './NewBitmap/bitmap-layer/bitmap-layer'

import Canvas from "../Canvas";
import './index.less'
const Deck = ({fitToWindow, card, width, height, canvas}) => {

    //const [fitToWindow, setFitToWindow] = useState(false);
    //const context = useCesium();

    const cesium = new CanvasMapLayer( {canvas : canvas });

    const map = new BitmapLayer({
        id: 'bitmap-layer1',
        bounds: [-121.5190, 37.6045, -122.355, 37.929],
        image: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-districts.png',
        opacity : 1
    });

    return (
        <div className={'CesiumMap'}>
            <div className={fitToWindow ? 'blocked' : ''}>


                <MapMaker width={width} height={height} fitToWindow={fitToWindow} card={card} layers={[  map ]} />

            </div>
        </div>

    );
};

export default ({card}) => {

    const [fitToWindow, setFitToWindow] = useState(false);
    const [canvas, setCanvas] = useState(false);

    const targetRef = useRef(null);
    const divRef = useRef(null);


    const [dimensions, setDimensions] = useState({ width:0, height: 0 });

    useLayoutEffect(() => {
        if (divRef.current) {

            setDimensions({
                width:  divRef.current.parentNode.offsetWidth,
                height: divRef.current.parentNode.offsetHeight
            });
        }
    }, []);

    useEffect(() => {

        if (true && targetRef.current && targetRef.current.cesiumElement) {

            const viewer = (targetRef.current.cesiumElement);

            // viewer.scene.screenSpaceCameraController.enableRotate       = false;
            // viewer.scene.screenSpaceCameraController.enableTranslate    = false;
            // viewer.scene.screenSpaceCameraController.enableTilt         = false;
            // viewer.scene.screenSpaceCameraController.enableLook         = false;

            let tint = new Cartesian3( 0.6, 0.75, 1.3 );

            var lastNow = Date.now();
            // viewer.clock.onTick.addEventListener(function(clock) {
            //     var now = Date.now();
            //     var spinRate = 0.1;
            //     var delta = (now - lastNow) / 1000;
            //     lastNow = now;
            //     viewer.scene.camera.rotate(Cartesian3.UNIT_Z, -spinRate * delta);
            // });
        }
    }, []);

    //return <div>
     //   /<code>{dimensions.width}</code>
     //   {dimensions.width  > 0 && <Deck card={card} width={dimensions.width} height={dimensions.height}/> }
    //</div>

        var offscreen = new OffscreenCanvas(256, 256);

        return (

            <div ref={divRef} className={fitToWindow ? 'fitToWindow' : ""}>

                <a style={{position : 'fixed', top : 0, left : 0}} onClick={() => setFitToWindow(!fitToWindow)}>fit</a>

                {/*<Canvas  registerCanvas={setCanvas}/>*/}

                {/*<Viewer container={canvas} ref={targetRef}   style={{ opacity : 0, position : 'absolute', top : 0, left : 0,  width : dimensions.width, height : dimensions.width}} >*/}




                {/*    /!*<Deck fitToWindow={fitToWindow} card={card} width={dimensions.width} height={dimensions.height} />*!/*/}

                {/*</Viewer>*/}

                <Deck canvas={canvas} fitToWindow={fitToWindow} card={card} width={dimensions.width} height={dimensions.height} />


            </div>
        );
}

