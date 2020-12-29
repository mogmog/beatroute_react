import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as portals from "react-reverse-portal";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import './styles.less';

gsap.registerPlugin(ScrollTrigger);

function RenderingCard(props) {
    const [inViewport, setInViewport] = useState(false);
    const ref = useRef();

    useEffect(() => {
        ScrollTrigger.create({
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => {
                setInViewport(true);
            },
            onEnterBack: () => {
                setInViewport(true);
            },
            onLeave: () => {
                setInViewport(false);
            },
            onLeaveBack: () => {
                setInViewport(false);
            },
            scrub: 1
          });
    }, []);

    //console.log(props);

    return (
        <div className="rendering-card" >
            <div className="rendering-card-content" ref={ref}>
                {inViewport ? <portals.OutPortal node={props.portalNode} card={props.card}  /> : null}
            </div>
        </div>
    );
}

// RenderingCard.propTypes = {
//     component: PropTypes.func.isRequired,
// };

export default RenderingCard;
