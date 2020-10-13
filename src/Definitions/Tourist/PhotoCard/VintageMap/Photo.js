import React from 'react';
import * as turf from '@turf/turf/index';
import { CompositeLayer } from '@deck.gl/core';
import { BitmapLayer } from "@deck.gl/layers";
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {PlaneGeometry} from '@luma.gl/engine';
import * as d3 from 'd3';
import {Matrix4} from 'math.gl';

export default class extends CompositeLayer {

  initializeState() {
        let self = this;

        this.setState({
          altitude : 30000,
          plane :  new PlaneGeometry({
            type: 'x,y',
            xlen: 3600,
            ylen: 4000,
            nx: 1,
            ny: 1,
            offset: 0
          })
        });

    }

  shouldUpdateState({ changeFlags }) {
    return changeFlags.somethingChanged;
  }

  finalizeState() {
    super.finalizeState();
  }

  renderLayers() {
    const { altitude , cameraBearing} = this.state;
    const { bounds, image, out, center } = this.props;

    const photo = new SimpleMeshLayer ({

      data : [{position: [-122.5390, 37.6045]}],
      mesh: this.state.plane,
      texture: '/photo.jpeg',
      getColor : (d)=> [255,0,0,125],
      sizeScale: 1,
      getOrientation : [0,5, -180],
      modelMatrix : new Matrix4().makeTranslation(0,0, out ),
      parameters : {
        blend: true,
        depthTest: false
      }

    });

    //const gel = new GelLayer({ altitude : altitude, out, bounds, center, image, cameraBearing : cameraBearing  });

    return [ photo ];
  }
}
