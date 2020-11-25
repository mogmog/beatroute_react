import React from 'react'
import './index.less'
import Frame from "../Front/Frame";

// export default () => <Frame width={document.body.clientWidth}>
export default ({i}) => <div className={'Title'}>
    <Frame width={350}  height={200} >
                            <h1>Week {i }</h1>

                            <p contenteditable="true">Today we go here and there</p>
    </Frame>
</div>
