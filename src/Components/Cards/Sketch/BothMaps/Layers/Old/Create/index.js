import {
  EditableGeoJsonLayer
} from 'nebula.gl';

import { PathStyleExtension } from '@deck.gl/extensions';
import GL from '@luma.gl/constants';

export default class extends EditableGeoJsonLayer {
  constructor(props) {

    const params = {
      id: 'createtankgeojson',
      data: [],
      selectedFeatureIndexes : [],

      mode : 'DrawPolygonMode',
      modeConfig : '',
      autoHighlight: false,
      extensions: [new PathStyleExtension({dash: true})],
      // Editing callbacks
      onEdit: ({ updatedData, editType, featureIndexes, editContext }) => {
          //props.updateGeoJson(updatedData);
      },

      // Specify the same GeoJsonLayer props
      lineWidthMinPixels: 2,
      pointRadiusMinPixels: 5,
      getDashArray: () => [0, 0],

      // Accessors receive an isSelected argument
      getFillColor: (feature, isSelected) => {
        return [0x55, 0xE2, 0xC2, 0xff] ;
      },
      getLineColor: (feature, isSelected) => {
        return isSelected ? [0x00, 0x20, 0x90, 0xff] : [0x20, 0x20, 0x20, 0xff];
      },

      // customize tentative feature style
      getTentativeLineDashArray: () => [7, 4],
      getTentativeLineColor: () => [0x8f, 0x8f, 0x8f, 0xff],

      parameters: {
        depthTest: true,
        depthMask: false,

        blend: true,
        blendEquation: GL.FUNC_ADD,
        blendFunc: [GL.SRC_ALPHA, GL.ONE_MINUS_SRC_ALPHA]
      }
    };

    super(params);
  }
}
