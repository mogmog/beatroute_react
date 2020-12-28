import React, {Fragment} from 'react'
import ClearAnnotations from './ClearAnnotations'

export default  ({  viewState, saveLandscapeBound, refetch, revertView, addLandscapeMode, setAddLandScapeMode, setDrawMode, drawMode, clearAnnotations, setAddInk, addInk, card, fit, revert, deckActive , cesiumActive, setFirstLoad, setCesiumActive, setDeckActive}) => {
    return (<Fragment>

        {!cesiumActive && <wired-button elevation="2" disabled={deckActive}  onClick={()=> {
            setAddInk();
        }}>
            {!addInk  && <span>Add Ink</span> }
            {addInk && <span>Save</span> }
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
      Move map
    </wired-button> }

    {deckActive && <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setDeckActive(false);
    }}>
        Save
    </wired-button> }

    {!addLandscapeMode && <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setDeckActive(true);
        setAddLandScapeMode(true);
    }}>
        Add Landscape flyover
    </wired-button> }

    {addLandscapeMode && <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
                        setDeckActive(false);
                        setAddLandScapeMode(false);
                        saveLandscapeBound(viewState);
                        revertView();
                    }}>
                        Save Landscape flyover
                    </wired-button>}

    <ClearAnnotations card={card} refetch={refetch}/>

    </Fragment>
    )
}
