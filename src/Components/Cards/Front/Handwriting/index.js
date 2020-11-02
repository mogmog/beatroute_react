import React, {useState, useEffect, useRef} from 'react'
import * as d3 from 'd3';
import  rough from 'roughjs/bundled/rough.esm';

export default ({width=450, height=100, text, children}) => {

    const [svg, setSVG] = useState(null);
    const d3Container = useRef(null);

    useEffect(() =>{
        fetch('https://us-central1-handwriting-292209.cloudfunctions.net/makeText/' + text,
            {
                method : 'GET'
            }

        ).then(res => res.json()).then(response => {
            setSVG(response);
        })
    }, []);


    useEffect(() =>{

        if (false && svg) {

            const d3svg = d3.select(d3Container.current);

            var highlightElement = d3svg.select('#highlight');

            var bboxGroup = d3svg.select('#words').node().getBBox()

            const rc = rough.svg(svg);

            const line = highlightElement.node().appendChild(rc.line(bboxGroup.x - 30, 0, bboxGroup.x +  bboxGroup.width + 20, 0, {
                stroke: 'black',
                roughness: 0.3,
                bowing : 4,
                strokeWidth: 2
            }));

            d3.select(line).attr('transform' , `translate(0, ${ bboxGroup.height + bboxGroup.y })`)
        }

    }, [svg, d3Container.current]);


    //

    return <div>

        <svg id="svg" width={width} height={height}  ref={d3Container}>

            {/*<defs>*/}
            {/*    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="roughPaper">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="128" numOctaves="1" result="noise">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">*/}
            {/*            <feDistantLight azimuth="45" elevation="55">*/}
            {/*            </feDistantLight>*/}
            {/*        </feDiffuseLighting>*/}
            {/*        <feGaussianBlur in="diffLight" stdDeviation="0.75" result="dlblur">*/}
            {/*        </feGaussianBlur>*/}
            {/*        <feComposite operator="arithmetic" k1="1.2" k2="0" k3="0" k4="0" in="dlblur" in2="SourceGraphic" result="out">*/}
            {/*        </feComposite>*/}
            {/*    </filter>*/}
            {/*    <filter x="-2%" y="-2%" width="104%" height="104%" filterUnits="objectBoundingBox" id="PencilTexture">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" result="newSource">*/}
            {/*        </feDisplacementMap>*/}
            {/*    </filter>*/}
            {/*    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture2">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="f1">*/}
            {/*        </feTurbulence>*/}
            {/*        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">*/}
            {/*        </feColorMatrix>*/}
            {/*        <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3">*/}
            {/*        </feComposite>*/}
            {/*    </filter>*/}
            {/*    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture3">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1">*/}
            {/*        </feTurbulence>*/}
            {/*        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">*/}
            {/*        </feColorMatrix>*/}
            {/*        <feComposite operator="in" in2="f2b" in="SourceGraphic" result="f3">*/}
            {/*        </feComposite>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="2.5" in="f3" result="f4">*/}
            {/*        </feDisplacementMap>*/}
            {/*    </filter>*/}
            {/*    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture4">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f1" result="f4">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f2" result="f5">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="f3" result="f6">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feBlend mode="multiply" in2="f4" in="f5" result="out1">*/}
            {/*        </feBlend>*/}
            {/*        <feBlend mode="multiply" in="out1" in2="f6" result="out2">*/}
            {/*        </feBlend>*/}
            {/*    </filter>*/}
            {/*    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture5">*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="t1">*/}
            {/*        </feTurbulence>*/}
            {/*        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="t2">*/}
            {/*        </feColorMatrix>*/}
            {/*        <feComposite operator="in" in2="t2" in="SourceGraphic" result="SourceTextured">*/}
            {/*        </feComposite>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f1" result="f4">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f2" result="f5">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">*/}
            {/*        </feTurbulence>*/}
            {/*        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceTextured" in2="f3" result="f6">*/}
            {/*        </feDisplacementMap>*/}
            {/*        <feBlend mode="multiply" in2="f4" in="f5" result="out1">*/}
            {/*        </feBlend>*/}
            {/*        <feBlend mode="multiply" in="out1" in2="f6" result="out2">*/}
            {/*        </feBlend>*/}
            {/*    </filter>*/}
            {/*</defs>*/}

            <g id="highlight" opacity="0.65" transform={'translate(0, -300)'}/>

            <g id="words" xfilter="url(#pencilTexture5)" opacity="0.65" transform={'translate(0, -300)'}>
                {svg && svg.svg.map((p, i) => <path key={i} d={p}></path>)}
            </g>



        </svg>

    </div>


}
