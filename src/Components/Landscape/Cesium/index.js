import React, {Component, Fragment} from "react";
import {
    Viewer,
    Scene,
    Globe,
    Clock,
    SkyBox,
    Entity ,
    Camera
} from 'resium';

import * as Cesium from 'cesium';
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const terrainProvider = Cesium.createWorldTerrain({
    requestVertexNormals: true
});

const SAVE_LANDSCAPE = gql`

mutation( $card_id : Int,  $landscapecamera : jsonb){
                update_cards(where: {id: {_eq: $card_id}}, _set: {landscapecamera: $landscapecamera}) {
                    returning {
                                camera
                                id
                              }
                    }
                }
`;

class CesiumComponent extends Component {

    remove = (numberOfPendingTiles) => {
        if (numberOfPendingTiles === 0) {
           // this.props.setGlobeScreenshot(this.viewer.canvas);
        }
    }

    saveCamera = () => {

        const camera = this.viewer.camera;

        const store = {
            position: camera.position.clone(),
            direction: camera.direction.clone(),
            up: camera.up.clone(),
            right: camera.right.clone(),
            transform: camera.transform.clone(),
            frustum: camera.frustum.clone()
        };

        this.props.updateMap({variables : {card_id : this.props.card.id, landscapecamera : store}})
    }

    componentDidMount() {
        if (this.viewer) {
            this.viewer.scene.globe.tileLoadProgressEvent.addEventListener(this.remove);
            this.viewer.camera.moveEnd.addEventListener(this.saveCamera);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.card !== this.props.card && this.props.card.landscapecamera) {
            if (this.props.card.landscapecamera.position) {
                this.viewer.camera.flyTo({
                    destination: new Cesium.Cartesian3(
                        this.props.card.landscapecamera.position.x,
                        this.props.card.landscapecamera.position.y,
                        this.props.card.landscapecamera.position.z,
                    ),
                    orientation: {
                        direction   : new Cesium.Cartesian3(this.props.card.landscapecamera.direction.x,    this.props.card.landscapecamera.direction.y,    this.props.card.landscapecamera.direction.z),
                        up          : new Cesium.Cartesian3(this.props.card.landscapecamera.up.x,           this.props.card.landscapecamera.up.y,           this.props.card.landscapecamera.up.z)
                    },
                    duration: 0
                });
            }
        }
    }

    render() {
        return (
            <Viewer
                terrainProvider={terrainProvider}
                style={{  pointerEvents : 'none', zIndex : 0, opacity : 1,  zoom : 1.0, width : '100%', height : '400px'}}
                ref={e => {
                    this.viewer = e ? e.cesiumElement : undefined;
                }}
            >
                <Camera>
                    <Scene
                        highDynamicRange={true}
                    >
                        <Globe
                            enableLighting={false}
                            preloadSiblings={true}
                            tileCacheSize={1000}
                            maximumScreenSpaceError={1}
                        />
                    </Scene>
                </Camera>
            </Viewer>
        );
    }
}

export default ({card, refetch}) =>  <Mutation
    onError={() => alert('Could not save landscaape')}
    mutation={SAVE_LANDSCAPE}
    onCompleted={() => refetch()}
>

    {(updateLandscape, {loading, error}) => {

        return <Fragment>
           <CesiumComponent card={card} updateMap={updateLandscape}/>
        </Fragment>
    }}
</Mutation>
