import React, { Component } from 'react';
import {Card} from 'antd';

import './index.less';

class MapOverlay extends Component {

    render() {
      return (
        <div className={'MapOverlay'}>

            <div className={'map'} >

                    {this.props.map}

            </div>

        </div>
      );
    }
}

export default MapOverlay;
