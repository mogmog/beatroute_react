import React, {Component, useRef, useEffect} from 'react'
import Procedural from 'procedural-gl'
import Singleton from 'react-singleton'
import './index.less'

// class Alert extends Component {
//
//     state = {
//         counter : 1
//     }
//     componentDidMount() {
//         window.setInterval(()=> {
//             this.setState({counter : this.state.counter + 1})
//         }, 100)
//     }
//
//     render() {
//         return <div style={{backgroundColor : 'red', height: '400px'}}> alert {this.state.counter}</div>
//     }
// }
//
// export default Alert;//new Singleton(Alert)

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

        <div ref={containerRef} className={'Procedural'}/>

        {/*<div className="map-mode-container">*/}
        {/*        <div>*/}
        {/*            /!*<img className='looking' src={'/textures/looking.jpg'}/>*!/*/}
        {/*            <div className="mask-mode" >*/}
        {/*                <div >*/}
        {/*                    <div ref={containerRef} className={'Procedural'}/>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
    </div>

}
