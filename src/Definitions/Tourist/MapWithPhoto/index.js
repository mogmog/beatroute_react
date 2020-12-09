import React, {Fragment, useState} from 'react';
import MapMaker from "./../../../../MapMaker";

import {BitmapLayer, GeoJsonLayer} from "@deck.gl/layers";

import {TerrainLayer} from '@deck.gl/geo-layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import { View, MapView,  FirstPersonView, OrbitView, OrthographicView} from '@deck.gl/core';
import {CubeGeometry} from '@luma.gl/core'
import {PlaneGeometry} from '@luma.gl/engine';
import {Matrix4, Vector3} from 'math.gl';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import CanvasMap from "./canvasmap";
//import CesiumMap from './CesiumMap'

export default ({card, updateCard, addStep, countries, curtains}) => {

    return <section style={{border : '5px solid red'}} className={`inner panel notseethrough`} xstyle={{ transform: 'translateY(-280px)'}}>

           </section>




}

