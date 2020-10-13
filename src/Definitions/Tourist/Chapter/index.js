import React from "react";
import './index.less'
import Editor from "../../../../Editor";

export default ({card, addToRefs}) => <section className={`inner panel blue seethrough`}>

         <h1>&nbsp;<Editor card={card}/></h1>

         <div ref={addToRefs} className="line line-2">
           What an adventure
         </div>

</section>
