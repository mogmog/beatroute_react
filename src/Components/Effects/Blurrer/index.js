import { Motion, spring } from 'react-motion';
import { Fragment } from 'react';
import React from 'react';

const Blurrer = props => (
  <Motion defaultStyle={{ blur: 20 }} style={{ blur: spring(0) }}>
    {interpolatingStyle => (
      <div style={{ filter: `blur(${interpolatingStyle.blur}px)` }}>
        <Fragment>{props.children}</Fragment>
      </div>

    )}
  </Motion>
);

export default Blurrer;



/*
const Slider = props => (
  <Motion defaultStyle={{ translate: 315 }} style={{ translate: spring(0) }}>
    {interpolatingStyle => (
      <div style={{ transform: `translateX(${interpolatingStyle.translate}px)` }}>
        <Fragment>{props.children}</Fragment>
      </div>
    )}
  </Motion>
);*/
