import React, {useState,useEffect} from 'react'
import './index.less'
import Frame from "../Front/Frame";
import Front from "../Front";
import PhotosOnMap from "../PhotosOnMap";
import Sketch from "../Sketch";
import SVGScroll from "../../svg-scroll/SVGScroll";
import CardAdder from "../../Adder";
import Measure from "react-measure";
import TextareaAutosize from 'react-textarea-autosize';

// export default () => <Frame width={document.body.clientWidth}>
export default ({i}) => {

    const [seconds, setSeconds] = useState(170);

    return <div className={'Title'}>

        <Frame width={350}  height={seconds} >

            <h1>test</h1>

            <TextareaAutosize onHeightChange={(height)=> {
                setSeconds(height < 48 ? 170 : height + 150);
            } }>

                Type your text here </TextareaAutosize>
        </Frame>

    </div>

}
