import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

mutation MyMutation($content : jsonb, $trip_id : Int) {
  insert_cards(objects: {trip_id: $trip_id, type: "PhotosOnMap", content : $content}) {
    returning {
      id
    }
  }
}
`;

const content = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[0,0],[4,0],[4,4],[0,4],[0,0]]]},"properties":{"type":"map"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-1.845703125,2.0210651187669897]},"properties":{"type":"photo"}}]};

export default ({trip, refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add title card')}
            onCompleted={() => refetch()}
            mutation={ADD}
            variables={{content : content, trip_id : trip.id}}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Photos On Map
                        </wired-button>

            }}
        </Mutation>

    </div>
}
