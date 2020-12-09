import React, { useState, Component, Fragment } from 'react';
import BothMaps from './BothMaps'
import "wired-elements";
import CardSaver from "../../Saver";
import  './index.less'
import Deck from "./BothMaps/Deck";

export default ({ width, admin, card }) => {

    return <CardSaver >

        {
            (updateCard, updateMap, updateAnnotation, loading, error) => {
                return <div className={'Polaroids'}>
                            <Deck
                                deckActive={true}
                                admin={admin}
                                width={width}
                                // setDeckRef={deck => this.setState({deck : deck})}
                                updateCard={updateCard}
                                card={card} />
                       </div>
            }
        }
    </CardSaver>
}
