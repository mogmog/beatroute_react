import React, {useState, useEffect} from 'react'
import Rect from './Rect'
import './index.less'

export default ({width=480, height=600, children}) => {

    return <div>
            <div className="svg-container">
                        <svg id="svg" width={width} height={height} opacity={0.3}>
                            <Rect width={width} height={height} round={3} strokeWidth={1}/>
                        </svg>
            </div>

        <div className={'overlay'}>
            {children}
        </div>
    </div>


}
