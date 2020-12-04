import React, { Fragment, useState} from 'react'
import AddFront     from './AddFront'
import AddTitle     from './AddTitle'
import AddMap       from './AddMap'
import AddSketch    from './AddSketch'

export default ({trip, refetch}) => {

    const [showButtons, setShowButtons] = useState(false);

    return  <Fragment>

        <wired-button elevation="2" onClick={()=> {
            setShowButtons(true);
        }}>
             Add Content
        </wired-button>

        {showButtons && <div>

            <AddFront trip={trip} refetch={refetch}/>

            <br/>

            <AddTitle trip={trip} refetch={refetch}/>

            <br/>

            <AddMap trip={trip} refetch={refetch}/>

            <br/>

            <AddSketch trip={trip} refetch={refetch}/>


        </div> }

    </Fragment>
}
