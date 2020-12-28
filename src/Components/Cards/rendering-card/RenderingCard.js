import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
            start: 'top center',
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

    return (
        <div className="rendering-card" >
            <div className="rendering-card-content" ref={ref}>
                {inViewport ? 'IN VIEWPORT' : null}
            </div>
        </div>
    );
}

// RenderingCard.propTypes = {
//     component: PropTypes.func.isRequired,
// };

export default RenderingCard;
