import React from 'react'
import Frame from './Frame'
import Handwriting from './Handwriting'
import './index.less'

export default () => <Frame width={document.body.clientWidth}>
                        <div className={'Front'}>
                            <div className={'element'}>
                                <Handwriting text={'kazakstan'}/>
                            </div>
                        </div>
                     </Frame>
