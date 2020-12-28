import React, {useState} from 'react';
import Deck from './Deck';
import {Controller,  MapView, OrthographicView} from '@deck.gl/core';
import Landscape from "../../Landscape";
import RenderingCard from "../../rendering-card/RenderingCard";
export default class Component extends React.PureComponent {

    state = {
        yOffset : 0,
        deck : null,
        cesiumActive: false,
        deckActive: false,
        viewer : null,
        hideCesium : false,
        globeScreenshot : null,
        sigcanvas : null,

        addLandscapeMode : false
    }

    render() {

        return (

            <div>

                <div style={{ margin : 'auto', position: 'relative', top : '0px', width : this.props.width + 'px', height: 70 + this.props.height + 'px' }}>

                    <Deck

                            admin={this.props.admin}
                            width={this.props.width}
                            height={this.props.height}
                            addLandscapeMode={this.state.addLandscapeMode}
                            setAddLandScapeMode={(addLandscapeMode)=> this.setState({addLandscapeMode : addLandscapeMode})}
                            cesiumActive={this.state.cesiumActive}
                            deckActive={this.state.deckActive}
                            setDeckActive={(v)   => this.setState({deckActive : v})}
                            setCesiumActive={(v) => this.setState({cesiumActive : v})}
                            yOffset={this.state.yOffset}
                            setYOffset={(y) => this.setState({yOffset : y})}
                            setDeckRef={deck => this.setState({deck : deck})}
                            updateCard={this.props.updateCard}
                            updateAnnotation={this.props.updateAnnotation}
                            updateLandscape={this.props.updateLandscape}
                            card={this.props.card}
                            refetch={this.props.refetch}
                            incrementLoadedCount={this.props.incrementLoadedCount}
                            viewer={this.state.viewer} />

                </div>

                <RenderingCard/>
                {/*{true && <Landscape portalNode={this.props.portalNode} width={this.props.width} admin={this.props.admin} card={this.props.card}/> }*/}

            </div>
        );
    }
}
