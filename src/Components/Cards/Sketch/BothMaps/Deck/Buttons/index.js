import React, {Fragment} from 'react'
import AddPhoto from './AddPhoto'

export default  ({ setDrawMode, drawMode, setAddInk, addInk, card, fit, revert, deckActive , cesiumActive, setFirstLoad, setCesiumActive, setDeckActive}) => {
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
       Adjust stack
    </wired-button> }

    {deckActive && <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setDeckActive(false);
    }}>
        Save
    </wired-button> }

    <wired-button elevation="2" disabled={cesiumActive} onClick={()=> {
        setDrawMode('Arrow');
    }}>
     Add Arrow
    </wired-button>

    <AddPhoto card={card}/>

    </Fragment>
    )
}
