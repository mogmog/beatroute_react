import React, { useEffect } from 'react';
import { gsap } from "gsap";

import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin} from 'gsap/MotionPathPlugin';

import './style.css'

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const SVGScroll = () => {
    useEffect(() => {
        gsap.defaults({ease: "none"});

        gsap.set(".ball", {xPercent: -50, yPercent: -50})

        const tl = gsap.timeline({
        defaults: {
            duration: 0.05, 
            autoAlpha: 1, 
            scale: 2, 
            transformOrigin: 'center', 
            ease: "elastic(2.5, 1)"
        }})
        .to(".ball02, .text01", {}, 0.2) 
        .to(".ball03, .text02", {}, 0.33)
        .to(".ball04, .text03", {}, 0.46)

        gsap.timeline({defaults: {duration: 1},
        scrollTrigger: {
            trigger: "#svg-scroll",
            scrub: true,
            start: "top center",
            end: "bottom center"
        }})
        .to(".ball01", {duration: 0.01, autoAlpha: 1})
        .from(".theLine", {drawSVG: 0}, 0)
        .to(".ball01", {motionPath: {path: ".theLine", alignOrigin: [0.5, 0.5]}}, 0)
        .add(tl, 0);

    }, []);

    return (
        <div className="App-section">
            <h2>Scroll</h2>
            <svg id="svg-scroll" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 600 1200">
                <path className="line01 line" d="M 10 200  600 200" />
                <path className="line02 line" d="M 10 400  600 400" />
                <path className="line03 line" d="M 10 600  600 600" />
                <path className="line04 line" d="M 10 800  600 800" />
                <path className="line05 line" d="M 10 1000  600 1000" />
                <text className="text01" x="30" y="190">2018</text>
                <text className="text02" x="30" y="390">2019</text>
                <text className="text03" x="30" y="590">2020</text>

                <path 
                    className="theLine" 
                    d="M -5,0 Q 450 230 300 450 T 130 750 Q 100 850 300 1000 T 150 1200"
                    fill="none" 
                    stroke="black" 
                    strokeWidth="10px" 
                />
                
                <circle className="ball ball01" r="20" cx="25" cy="25" />
                <circle className="ball ball02" r="20" cx="298" cy="221" />
                <circle className="ball ball03" r="20" cx="347" cy="419" />
                <circle className="ball ball04" r="20" cx="223" cy="621" />
            </svg>
        </div>
    );
}

export default SVGScroll;
