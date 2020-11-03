import React, { Fragment, useState} from 'react'
import AddFront     from './AddFront'
import AddTitle     from './AddTitle'
import AddMap       from './AddMap'
import AddSketch    from './AddSketch'

export default ({refetch}) => {

    const [showButtons, setShowButtons] = useState(false);

    return  <Fragment>

        <wired-button elevation="2" onClick={()=> {
            setShowButtons(true);
        }}>
             Add Content
        </wired-button>

        {showButtons && <div>

            <AddFront refetch={refetch}/>

            <br/>

            <AddTitle refetch={refetch}/>

            <br/>

            <AddMap refetch={refetch}/>

            <br/>

            <AddSketch refetch={refetch}/>


        </div> }

    </Fragment>
}
