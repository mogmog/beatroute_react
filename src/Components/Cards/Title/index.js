import React from 'react'
import './index.less'

// export default () => <Frame width={document.body.clientWidth}>
export default ({i}) => <div className={'Title'}>
                            <h1>Week {i + 1}</h1>

                            <p contenteditable="true">Today we go here and there</p>

</div>
