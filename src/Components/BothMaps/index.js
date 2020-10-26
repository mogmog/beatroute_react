import React, {useState} from 'react';
import { Scene, Globe, Viewer, WallGraphics, ImageryLayer, PostProcessStage, Fog, Entity, CameraFlyTo, BlackAndWhiteStage } from 'resium';
import { createWorldTerrain, Cartesian3 } from 'cesium';
import { ArcGisMapServerImageryProvider, IonImageryProvider , Color} from "cesium";
import Deck from './Deck';
import Cesium from './Cesium'
import { useCesium } from "resium";

export default class Component extends React.PureComponent {

    state = {
        yOffset : 0,
        deck : null,
        cesiumActive: false,
        deckActive: false,
        viewer : null,
        hideCesium : false,
        globeScreenshot : null
    }

    render() {

        return (

            <div>

                <Cesium moveMap={this.props.moveMap} yOffset={this.state.yOffset}  setHideCesium={() => this.setState({hideCesium : !this.state.hideCesium})} hideCesium={this.state.hideCesium} deck={this.state.deck} setGlobeScreenshot={(ss) => this.setState({globeScreenshot : ss})} />

                <Deck
                        moveMap={this.props.moveMap}
                        moveTable={this.props.moveTable}
                        yOffset={this.state.yOffset}
                        setYOffset={(y) => this.setState({yOffset : y})}
                        globeDrawn={this.state.globeDrawn}
                        setDeckRef={deck => this.setState({deck : deck})}
                        updateCard={this.props.updateCard}
                        card={this.props.card}
                        globeScreenshot={this.state.globeScreenshot}
                        viewer={this.state.viewer} />


            </div>
        );
    }
}
