import React, {useState} from 'react';
import Deck from './Deck';
import {Controller,  MapView, OrthographicView} from '@deck.gl/core';

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

                <div style={{ margin : 'auto', position: 'relative', top : '0px', width : this.props.width + 'px', height: '500px' }}>

                    <Deck

                        admin={this.props.admin}
                            width={this.props.width}
                            cesiumActive={this.state.cesiumActive}
                            deckActive={this.state.deckActive}
                            setDeckActive={(v)   => this.setState({deckActive : v})}
                            setCesiumActive={(v) => this.setState({cesiumActive : v})}
                            yOffset={this.state.yOffset}
                            setYOffset={(y) => this.setState({yOffset : y})}
                            globeDrawn={this.state.globeDrawn}
                            setDeckRef={deck => this.setState({deck : deck})}
                            updateCard={this.props.updateCard}
                            updateAnnotation={this.props.updateAnnotation}
                            card={this.props.card}
                            globeScreenshot={this.state.globeScreenshot}
                            incrementLoadedCount={this.props.incrementLoadedCount}
                            viewer={this.state.viewer} />

                </div>

            </div>
        );
    }
}
