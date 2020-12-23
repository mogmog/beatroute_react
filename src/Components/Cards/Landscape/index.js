import React, {useRef, useEffect} from 'react'
import Procedural from 'procedural-gl'
import './index.less'

export default () => {

    const containerRef = useRef(null);

    useEffect(() => {

        Procedural.init( {
            container: containerRef.current,
            datasource: {
                elevation: {
                    apiKey: '14d1499d22e6e4e95946f624f7cc5745e'
                },
                imagery: {
                    urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cZQg2QaktSnI18BSAxZX',
                }
            }
        } );

        Procedural.displayLocation( {
            latitude:27.986065, longitude:86.92262
        } );

        Procedural.onLocationFocused = function () {
            console.log( 'Location focused' );
        };

    })

    return <div className="map-mode-container">
                <div>
                    <div className="mask-mode" >
                        <div >
                            <div ref={containerRef} className={'Procedural'}/>
                        </div>
                    </div>
                </div>
            </div>

    return <div className='map-container'>

            <div className="mask" >
                <img src={process.env.PUBLIC_URL + '/textures/bird.png'} alt="" />
                {/*<div ref={containerRef} className={'Procedural'}/>*/}
            </div>

    </div>

}
