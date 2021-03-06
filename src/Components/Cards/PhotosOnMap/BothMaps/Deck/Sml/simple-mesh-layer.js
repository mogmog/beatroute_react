import { Layer, project32, phongLighting, picking, COORDINATE_SYSTEM, log } from '@deck.gl/core';
import { Model, Geometry, Texture2D, isWebGL2 } from '@luma.gl/core';
import { hasFeature, FEATURES } from '@luma.gl/webgl';
import { MATRIX_ATTRIBUTES, shouldComposeModelMatrix } from './matrix';
import vs from './simple-mesh-layer-vertex.glsl';
import fs from './simple-mesh-layer-fragment.glsl';

function getTextureFromData(gl, data, opts) {
  if (data instanceof Texture2D) {
    return data;
  }

  return new Texture2D(gl, Object.assign({
    data
  }, opts));
}

function validateGeometryAttributes(attributes, useMeshColors) {
  const hasColorAttribute = attributes.COLOR_0 || attributes.colors;
  const useColorAttribute = hasColorAttribute && useMeshColors;

  if (!useColorAttribute) {
    attributes.colors = {
      constant: true,
      value: new Float32Array([1, 1, 1])
    };
  }

  log.assert(attributes.positions || attributes.POSITION, 'SimpleMeshLayer requires "postions" or "POSITION" attribute in mesh property.');
}

function getGeometry(data, useMeshColors) {
  if (data.attributes) {
    validateGeometryAttributes(data.attributes, useMeshColors);

    if (data instanceof Geometry) {
      return data;
    } else {
      return new Geometry(data);
    }
  } else if (data.positions || data.POSITION) {
    validateGeometryAttributes(data, useMeshColors);
    return new Geometry({
      attributes: data
    });
  }

  throw Error('Invalid mesh');
}

const DEFAULT_COLOR = [0, 0, 0, 255];
const defaultProps = {
  mesh: {
    value: null,
    type: 'object',
    async: true
  },
  texture: {
    type: 'object',
    value: null,
    async: true
  },
  sizeScale: {
    type: 'number',
    value: 1,
    min: 0
  },
  _useMeshColors: {
    type: 'boolean',
    value: false
  },
  parameters: {
    depthTest: true,
    depthFunc: 515
  },
  _instanced: true,
  wireframe: false,
  material: true,
  getPosition: {
    type: 'accessor',
    value: x => x.position
  },
  getColor: {
    type: 'accessor',
    value: DEFAULT_COLOR
  },
  getOrientation: {
    type: 'accessor',
    value: [0, 0, 0]
  },
  getScale: {
    type: 'accessor',
    value: [1, 1, 1]
  },
  getTranslation: {
    type: 'accessor',
    value: [0, 0, 0]
  },
  getTransformMatrix: {
    type: 'accessor',
    value: []
  }
};
export default class SimpleMeshLayer extends Layer {
  getShaders() {
    const transpileToGLSL100 = !isWebGL2(this.context.gl);
    const defines = {};

    if (hasFeature(this.context.gl, FEATURES.GLSL_DERIVATIVES)) {
      defines.DERIVATIVES_AVAILABLE = 1;
    }

    return super.getShaders({
      vs,
      fs,
      modules: [project32, phongLighting, picking],
      transpileToGLSL100,
      defines
    });
  }

  initializeState() {
    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      instancePositions: {
        transition: true,
        type: 5130,
        fp64: this.use64bitPositions(),
        size: 3,
        accessor: 'getPosition'
      },
      instanceColors: {
        type: 5121,
        transition: true,
        size: this.props.colorFormat.length,
        normalized: true,
        accessor: 'getColor',
        defaultValue: [0, 0, 0, 255]
      },
      instanceModelMatrix: MATRIX_ATTRIBUTES
    });
    this.setState({
      emptyTexture: new Texture2D(this.context.gl, {
        data: new Uint8Array(4),
        width: 1,
        height: 1
      })
    });
  }

  updateState({
    props,
    oldProps,
    changeFlags
  }) {
    super.updateState({
      props,
      oldProps,
      changeFlags
    });

    if (props.mesh !== oldProps.mesh || changeFlags.extensionsChanged) {
      if (this.state.model) {
        this.state.model.delete();
      }

      if (props.mesh) {
        this.setState({
          model: this.getModel(props.mesh)
        });
        const attributes = props.mesh.attributes || props.mesh;
        this.setState({
          hasNormals: Boolean(attributes.NORMAL || attributes.normals)
        });
      }

      this.getAttributeManager().invalidateAll();
    }

    // props.texture.resize({
    //   width: document.documentElement.clientWidth,
    //   height: document.documentElement.clientWidth,
    //
    // });

    //if (props.texture !== oldProps.texture) {
      this.setTexture(props.texture);



    if (this.state.model) {
      this.state.model.setDrawMode(this.props.wireframe ? 3 : 4);
    }
  }

  finalizeState() {
    super.finalizeState();
    this.state.emptyTexture.delete();

    if (this.state.texture) {
      this.state.texture.delete();
    }
  }

  draw({
    uniforms
  }) {
    if (!this.state.model) {
      return;
    }

    const {
      viewport
    } = this.context;
    const {
      sizeScale,
      coordinateSystem,
      _instanced
    } = this.props;
    this.state.model.draw({
      uniforms: Object.assign({}, uniforms, {
        sizeScale,
        composeModelMatrix: !_instanced || shouldComposeModelMatrix(viewport, coordinateSystem),
        flatShading: !this.state.hasNormals
      })
    });
  }

  getModel(mesh) {
    const model = new Model(this.context.gl, Object.assign({}, this.getShaders(), {
      id: this.props.id,
      geometry: getGeometry(mesh, this.props._useMeshColors),
      isInstanced: true
    }));
    const {
      texture,
      emptyTexture
    } = this.state;
    model.setUniforms({
      sampler: texture || emptyTexture,
      hasTexture: Boolean(texture)
    });
    return model;
  }

  setTexture(image) {
    const {
      gl
    } = this.context;
    const {
      emptyTexture,
      model
    } = this.state;

    if (this.state.texture) {
      //this.state.texture.delete();
    }

    const texture = image ? getTextureFromData(gl, image) : null;

    // texture.resize({
    //   width: document.documentElement.clientWidth,
    //   height: document.documentElement.clientWidth,
    // })

    texture.setSubImageData({
      data: image,
    });

    this.setState({
      texture
    });

    if (model) {
      model.setUniforms({
        sampler: texture || emptyTexture,
        hasTexture: Boolean(texture)
      });
    }
  }

}
SimpleMeshLayer.layerName = 'SimpleMeshLayer';
SimpleMeshLayer.defaultProps = defaultProps;
//# sourceMappingURL=simple-mesh-layer.js.map
