import React, { Component } from "react";
import { Viewer } from "resium";

export default class ExampleComponent extends Component {

    remove = (numberOfPendingTiles) => {
        if (numberOfPendingTiles === 0) {
            this.props.setGlobeScreenshot(this.viewer.canvas);
        }
    }

    componentDidMount() {
        if (this.viewer) {
            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(this.remove);
        }
    }

    componentWillUnmount() {
        this.viewer.scene.globe.tileLoadProgressEvent.removeEventListener(this.remove);
    }

    render() {
        return (
            <Viewer
                style={{ pointerEvents : (this.props.cesiumActive ? 'all' : 'none'), zIndex : 0, opacity : 0, position : 'absolute', top : (this.props.yOffset + 'px'), left : '0px',  width : '100vw', height : '100vw'}}
                ref={e => {
                    this.viewer = e ? e.cesiumElement : undefined;
                }}
            />
        );
    }
}
