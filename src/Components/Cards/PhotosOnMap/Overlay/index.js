import React, { Component } from 'react';
import {Card} from 'antd';

import './index.less';

class MapOverlay extends Component {

    render() {
      return (
        <div className={'MapOverlay'}>

            { this.props.map && <div className={'map'} >
                    {this.props.map}
            </div> }

            {this.props.preview && <div className={'preview'} >
                {this.props.preview}
            </div> }

        </div>
      );
    }
}

export default MapOverlay;
