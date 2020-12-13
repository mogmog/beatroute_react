import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

mutation ($content : jsonb, $camera : jsonb, $polaroid_camera : jsonb, $trip_id : Int) {

  insert_cards(objects: [
                {trip_id: $trip_id, type: "Title", content : $content, camera : $camera},
                {trip_id: $trip_id, type: "Sketch", content : $content, camera : $camera},
                {trip_id: $trip_id, type: "Polaroid", content : $content, camera : $polaroid_camera}
                ]) {
    returning {
      id
    }
  }
}



`;

const camera = {"zoom":3.0129167754311057,"pitch":0,"width":500,"height":600,"bearing":0,"maxZoom":20,"minZoom":0,"altitude":1.5,"latitude":8.256043799900645,"maxBearing":0,"minBearing":0,"longitude":2.6226391365730866};
const content = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[0,0],[4,0],[4,4],[0,4],[0,0]]]},"properties":{"type":"map"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-1.845703125,2.0210651187669897]},"properties":{"type":"photo"}}]};

const polaroid_camera = {"zoom":2.0340441946918117,"width":500,"height":600,"target":[21.82497956377069,41.576120620825634,-4.263256414560601e-14],"maxZoom":20,"minZoom":0,"orbitAxis":"Z","rotationX":0,"maxRotationX":90,"minRotationX":-90,"rotationOrbit":0};

export default ({trip, refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add sketch card')}
            onCompleted={() => refetch()}
            mutation={ADD}
            variables={{content : content, camera : camera, trip_id : trip.id, polaroid_camera : polaroid_camera}}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Sketch and photos {trip.name}
                        </wired-button>

            }}
        </Mutation>

    </div>
}
