import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

mutation MyMutation($content : jsonb) {
  insert_cards(objects: {trip_id: 3, type: "Sketch", content : $content}) {
    returning {
      id
    }
  }
}
`;

const content = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[0,0],[4,0],[4,4],[0,4],[0,0]]]},"properties":{"type":"map"}},{"type":"Feature","geometry":{"type":"Point","coordinates":[-1.845703125,2.0210651187669897]},"properties":{"type":"photo"}}]};

export default ({refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add sketch card')}
            onCompleted={refetch}
            mutation={ADD}
            variables={{content : content}}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Sketch
                        </wired-button>

            }}
        </Mutation>

    </div>
}
