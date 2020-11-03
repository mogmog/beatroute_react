import React, {Fragment} from 'react'
import * as turf from "@turf/turf";

export default  ({ card, fit, revert, deckActive , cesiumActive, setFirstLoad, setCesiumActive, setDeckActive}) => {
    return (<Fragment>
        {!cesiumActive && <wired-button elevation="2" disabled={deckActive}  onClick={()=> {

        setFirstLoad();
        setCesiumActive(true);
        fit(
            turf.bbox(card.content.features[0]),
            turf.center(card.content.features[0]));
    }}>
        Change map
    </wired-button> }

    {cesiumActive && <wired-button elevation="2" disabled={deckActive} onClick={()=> {
        setCesiumActive(false);
        revert();
    }}>
        Save
    </wired-button> }

    {!deckActive &&  <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setFirstLoad();
        setCesiumActive(false);
        setDeckActive(true);
    }}>
       Adjust stack
    </wired-button> }

    {deckActive && <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setDeckActive(false);
    }}>
        Save
    </wired-button> }


            <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {

            }}>
              Remove Stack
            </wired-button>

    </Fragment>
    )
}
