import React, { useState, Component, Fragment } from 'react';
import Handwriting from "../Front/Handwriting";
import BothMaps from './BothMaps'
import "wired-elements";
import CardSaver from "../../Saver";
import  './index.less'

export default ({index, width, admin, card, incrementLoadedCount, stillLoading}) => {

    return <CardSaver >

        {
            (updateCard, updateMap, loading, error) => {
                return <div className={'PhotosOnMap'}>
                            <BothMaps width={width} admin={admin} stillLoading={stillLoading} incrementLoadedCount={incrementLoadedCount} updateMap={updateMap} updateCard={updateCard} card={card}/>
                       </div>
            }
        }
    </CardSaver>
}
