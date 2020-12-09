import React from 'react'
import Frame from './Frame'
//import Handwriting from './Handwriting'
import './index.less'

// export default () => <Frame width={document.body.clientWidth}>
export default () => <div className={'Front'}>
    <Frame width={450} height={600}>
                            <h1>Lake District 2021</h1>
                            <img style={{width : '300px' , height : 'auto'}} src={'/title.png'}/>
                            {/*<Handwriting text={'kazakstan'}/>*/}

    </Frame>
                        </div>
                     // </Frame>
