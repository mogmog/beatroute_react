import React, {Fragment} from 'react';

import Controls from './../Controls'
import FrontCover      from "../Definitions/Tourist/FrontCover";
import Chapter         from "../Definitions/Tourist/Chapter";
import MapWithPhoto    from "../Definitions/Tourist/MapWithPhoto";
import PhotoCard       from "../Definitions/Tourist/PhotoCard";

export default ({isPauseScrolling, onPauseScrolling, card, currentCard, refetch, curtains, addToRefs, canMoveMap, setCanMoveMap, setCurrentCard}) => {

    return  <div style={{pointerEvents : isPauseScrolling ? 'none' : 'all'}}>
                <Controls isPauseScrolling={isPauseScrolling} onPauseScrolling={onPauseScrolling} card={card} setCurrentCard={setCurrentCard} canMoveMap={canMoveMap} setCanMoveMap={setCanMoveMap}>

                <div className={'card '}>
                      { false && card.type === 'FrontCover'        && <FrontCover      addToRefs={addToRefs} card={card}  />}
                      { false && card.type === 'Chapter'           && <Chapter         addToRefs={addToRefs} card={card}  /> }
                      { false && card.type === 'MapWithPhoto'      && <MapWithPhoto    addToRefs={addToRefs} card={card}  /> }
                      { card.type === 'PhotoCard'         && <PhotoCard    addToRefs={addToRefs} card={card}  /> }
                </div>
            </Controls>
        </div>
}
