import React, {Component, useRef, useEffect} from 'react'
import Procedural from 'procedural-gl'
import './index.less'

export default (props) => {

    const containerRef = useRef(null);

    useEffect(() => {

        Procedural.init( {
            container: containerRef.current,
            datasource: {
                elevation: {
                    apiKey: '1b045ec93f5b94db894037db8d297128e'
                },
                imagery: {
                    urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cZQg2QaktSnI18BSAxZX',
                    attribution: '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }
            }
        } );


    }, []);

    useEffect(() => {

        var target = { latitude: 43.21, longitude: 6.133 };
        Procedural.displayLocation( target );

        Procedural.onUserInteraction = function () {
          console.log(props);
        }

        Procedural.onLocationFocused = function () {
            console.log( 'Location focused' );
        };

    }, [props.card])

    return <div>

        <img className={'balloon'} src={'/textures/balloon.png'}/>

        <div className="map-mode-container">
                <div>
                    <div className="mask-mode" >
                        <div >
                            <div ref={containerRef} className={'Procedural'}/>
                        </div>
                    </div>
                </div>
            </div>
    </div>

}
