import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";

import Controls from '../../Cards/Controls'
import Map from '../../Maps/Drone'
import './index.less';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import UnderlayBackground from './underlay-background/UnderlayBackground';
import CardGroupScroll from "./card-group-scroll/CardGroupScroll";
import CardManager from "../../Cards/CardManager";
gsap.registerPlugin(ScrollTrigger);

function Index({thing, cards, refetch}) {

  return (
      <Fragment>


       </Fragment>
  );
}

export default Index;
