import React, { useState, Component, Fragment } from 'react';
import Overlay from './Overlay'
import Map from './Map';
import {Spring} from 'react-spring/renderprops'
import { Viewport,  FlyToInterpolator, TransitionInterpolator} from '@deck.gl/core';
import Handwriting from "../Front/Handwriting";
import BothMaps from './../../../Components/BothMaps'
import "wired-elements";
import CardSaver from "../../Saver";

export default ({index, admin, card, incrementLoadedCount, stillLoading}) => {

    return <CardSaver >

        {
            (updateCard, updateMap, loading, error) => {
                return <Fragment>

                    <Handwriting text={'Week ' + (index) }/>
                    <code>  Card ID : {card.id}</code>
                    <BothMaps admin={admin} stillLoading={stillLoading} incrementLoadedCount={incrementLoadedCount} updateMap={updateMap} updateCard={updateCard} card={card}/>

                </Fragment>
            }
        }
    </CardSaver>
}
