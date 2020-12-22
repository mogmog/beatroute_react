import React, { useState, Component, Fragment } from 'react';
import BothMaps from './BothMaps'
import "wired-elements";
import CardSaver from "../../Saver";
import  './index.less'

export default ({index, width, admin, card, incrementLoadedCount, stillLoading, refetch}) => {

    return <CardSaver refetch={refetch}>

        {
            (updateCard, updateMap, updateAnnotation, loading, error) => {
                return <div className={'Sketch'}>
                            <BothMaps width={width} height={width} admin={admin} stillLoading={stillLoading} incrementLoadedCount={incrementLoadedCount} updateMap={updateMap} updateAnnotation={updateAnnotation} updateCard={updateCard} card={card} refetch={refetch}/>
                       </div>
            }
        }
    </CardSaver>
}
