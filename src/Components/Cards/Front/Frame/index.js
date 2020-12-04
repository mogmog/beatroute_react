import React, {useState, useEffect} from 'react'
import Rect from './Rect'
import './index.less'

export default ({width=400, height=200, children}) => {

    return <div className={'overlay'}>
        {children}
    </div>

    return <div>
        <div className="svg-container">
            <svg id="svg" width={width} height={height} >

                <defs>
                    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="roughPaper">
                        <feTurbulence type="fractalNoise" baseFrequency="128" numOctaves="1" result="noise">
                        </feTurbulence>
                        <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="1" result="diffLight">
                            <feDistantLight azimuth="45" elevation="55">
                            </feDistantLight>
                        </feDiffuseLighting>
                        <feGaussianBlur in="diffLight" stdDeviation="0.75" result="dlblur">
                        </feGaussianBlur>
                        <feComposite operator="arithmetic" k1="1.2" k2="0" k3="0" k4="0" in="dlblur" in2="SourceGraphic" result="out">
                        </feComposite>
                    </filter>
                    <filter x="-2%" y="-2%" width="104%" height="104%" filterUnits="objectBoundingBox" id="PencilTexture">
                        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" result="newSource">
                        </feDisplacementMap>
                    </filter>
                    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture2">
                        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="f1">
                        </feTurbulence>
                        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
                        </feColorMatrix>
                        <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3">
                        </feComposite>
                    </filter>
                    <filter x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" id="pencilTexture3">
                        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1">
                        </feTurbulence>
                        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="f2">
                        </feColorMatrix>
                        <feComposite operator="in" in2="f2b" in="SourceGraphic" result="f3">
                        </feComposite>
                        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="2.5" in="f3" result="f4">
                        </feDisplacementMap>
                    </filter>
                    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture4">
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f1" result="f4">
                        </feDisplacementMap>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceGraphic" in2="f2" result="f5">
                        </feDisplacementMap>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceGraphic" in2="f3" result="f6">
                        </feDisplacementMap>
                        <feBlend mode="multiply" in2="f4" in="f5" result="out1">
                        </feBlend>
                        <feBlend mode="multiply" in="out1" in2="f6" result="out2">
                        </feBlend>
                    </filter>
                    <filter x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" id="pencilTexture5">
                        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="5" stitchTiles="stitch" result="t1">
                        </feTurbulence>
                        <feColorMatrix type="matrix" values="0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5" result="t2">
                        </feColorMatrix>
                        <feComposite operator="in" in2="t2" in="SourceGraphic" result="SourceTextured">
                        </feComposite>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="1" result="f1">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f1" result="f4">
                        </feDisplacementMap>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="10" result="f2">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="5" in="SourceTextured" in2="f2" result="f5">
                        </feDisplacementMap>
                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" seed="100" result="f3">
                        </feTurbulence>
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="3" in="SourceTextured" in2="f3" result="f6">
                        </feDisplacementMap>
                        <feBlend mode="multiply" in2="f4" in="f5" result="out1">
                        </feBlend>
                        <feBlend mode="multiply" in="out1" in2="f6" result="out2">
                        </feBlend>
                    </filter>
                </defs>
                <g id="land">

                    <g xfilter="url(#pencilTexture5)" opacity="0.33">
                        <Rect width={width} height={height} round={5} strokeWidth={1}/>
                    </g>

                </g>

            </svg>
        </div>

        <div className={'overlay'}>
            {children}
        </div>
    </div>


}
