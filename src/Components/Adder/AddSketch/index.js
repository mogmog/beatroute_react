import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

mutation MyMutation($content : jsonb, $camera : jsonb, $trip_id : Int) {
  insert_cards(objects: {trip_id: $trip_id, type: "Sketch", content : $content, camera : $camera}) {
    returning {
      id
    }
  }
}
`;

const camera = {"zoom":3.0129167754311057,"pitch":0,"width":500,"height":600,"bearing":0,"maxZoom":20,"minZoom":0,"altitude":1.5,"latitude":8.256043799900645,"maxBearing":0,"minBearing":0,"longitude":2.6226391365730866};
const content = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[0,0],[4,0],[4,4],[0,4],[0,0]]]},"properties":{"type":"map"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-1.845703125,2.0210651187669897]},"properties":{"type":"photo"}}]};

export default ({trip, refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add sketch card')}
            onCompleted={() => refetch()}
            mutation={ADD}
            variables={{content : content, camera : camera, trip_id : trip.id}}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Sketch to {trip.name}
                        </wired-button>

            }}
        </Mutation>

    </div>
}
