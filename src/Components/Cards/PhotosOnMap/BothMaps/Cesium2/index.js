import React, { Component } from "react";
import { Cesium3DTileset, createWorldTerrain, IonResource, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if (this.myRef.current) {
            var viewer = new Viewer(this.myRef.current, {
                terrainProvider: createWorldTerrain()
            });
        }
    }

    render() {
        return <div ref={this.myRef} />;
    }
}


// class Form extends Component {
//     constructor() {
//         super();
//
//         this.state = {
//             value: ""
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     handleChange(event) {
//         const { value } = event.target;
//         this.setState(() => {
//             return {
//                 value
//             };
//         });
//     }
//
//     render() {
//         return (<div></div>
//     );
//     }
// }
//
// export default Form;
