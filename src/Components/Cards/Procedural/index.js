import React from 'react'
import Procedural from 'procedural-gl'
import './index.less'
export default () => {

    Procedural.init( {
        container: document.getElementById( 'mapcontainer' ),
        datasource: {
            elevation: {
                apiKey: '14d1499d22e6e4e95946f624f7cc5745e'
            },
            imagery: {
                apiKey : 'cZQg2QaktSnI18BSAxZX',
                urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key={apiKey}',
            }
        }
    } );

    Procedural.displayLocation( {
        latitude:27.986065, longitude:86.92262
    } );

    Procedural.onLocationFocused = function () {
        console.log( 'Location focused' );
    };


    return <div id={'mapcontainer'}>test</div>

}
