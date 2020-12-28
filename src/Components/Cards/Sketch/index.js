import React, { useState, Component, Fragment } from 'react';
import BothMaps from './BothMaps'
import "wired-elements";
import CardSaver from "../../Saver";
import  './index.less'

export default ({index, portalNode, landscape, width, admin, card, incrementLoadedCount, stillLoading, refetch}) => {

    return <CardSaver refetch={refetch}>

        {
            (updateCard, updateMap, updateAnnotation, updateLandscape, loading, error) => {
                return <div className={'Sketch'}>
                            <BothMaps portalNode={portalNode} landscape={landscape} width={width} height={width} admin={admin} stillLoading={stillLoading} incrementLoadedCount={incrementLoadedCount} updateMap={updateMap} updateAnnotation={updateAnnotation} updateLandscape={updateLandscape} updateCard={updateCard} card={card} refetch={refetch}/>
                       </div>
            }
        }
    </CardSaver>
}
