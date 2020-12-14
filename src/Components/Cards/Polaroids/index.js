import React, { useState, Component, Fragment } from 'react';
import "wired-elements";
import CardSaver from "../../Saver";
import Deck from "./Deck";
import AddPhoto from "./AddPhoto";
import  './index.less'

export default ({ width, admin, card }) => {

    return <CardSaver >

        {
            (updateCard, updateMap, updateAnnotation, loading, error) => {
                return <div className={'Polaroids'}>

                            <AddPhoto card={card}/>

                            <Deck
                                deckActive={false}
                                admin={admin}
                                width={width}
                                updateCard={updateCard}
                                card={card} />
                       </div>
            }
        }
    </CardSaver>
}
