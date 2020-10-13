import React, {useState} from 'react'
import {Spring, config} from 'react-spring/renderprops'
import './index.less'
import VintageMap from './VintageMap'

export default () => {

    const [out, setOut]                     = useState(false);

    return <div className='PhotoCard'>

        <a onClick={() => setOut(!out)}>Move {!out && <span>Up</span>}</a>

        {true && <Spring


            from={{ opacity: 0}}
            to={!out ? { opacity: 10000} : { opacity: 0}}>
            {springprops =><div>

             <VintageMap out={springprops.opacity}/>
            </div>
            }
        </Spring> }




    </div>

}
