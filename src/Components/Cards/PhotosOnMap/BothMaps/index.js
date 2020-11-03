import React, {useState} from 'react';
import Deck from './Deck';
import Cesium from './Cesium'
//import { useCesium } from "resium";

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


                {/*<code>{this.state.deckActive && 'deck active'}</code>*/}

                <div style={{ margin : 'auto', position: 'relative', top : '0px', width : '500px', height: '500px' }}>

                    {true && <Cesium cesiumActive={this.state.cesiumActive}
                            deckActive={this.state.deckActive}
                            yOffset={this.state.yOffset}
                            setHideCesium={() => this.setState({hideCesium : !this.state.hideCesium})}
                            hideCesium={this.state.hideCesium}
                            deck={this.state.deck}
                            card={this.props.card}
                            updateMap={this.props.updateMap}
                            setGlobeScreenshot={(ss) => this.setState({globeScreenshot : ss})} /> }

                    <Deck
                            admin={this.props.admin}
                            cesiumActive={this.state.cesiumActive}
                            deckActive={this.state.deckActive}
                            setDeckActive={(v)   => this.setState({deckActive : v})}
                            setCesiumActive={(v) => this.setState({cesiumActive : v})}
                            yOffset={this.state.yOffset}
                            setYOffset={(y) => this.setState({yOffset : y})}
                            globeDrawn={this.state.globeDrawn}
                            setDeckRef={deck => this.setState({deck : deck})}
                            updateCard={this.props.updateCard}
                            card={this.props.card}
                            globeScreenshot={this.state.globeScreenshot}
                            incrementLoadedCount={this.props.incrementLoadedCount}
                            viewer={this.state.viewer} />

                </div>


            </div>
        );
    }
}
