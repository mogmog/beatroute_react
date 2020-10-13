import React from "react";
import './index.less'
import Editor from './../../../../Editor'

export default ({card, addToRefs}) => <section className={`inner panel orange seethrough`}>

     <div>

         <h1>&nbsp;<Editor card={card}/></h1>

         <div ref={addToRefs} className="line line-2">

         </div>

    </div>

</section>
