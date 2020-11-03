import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD_FRONT = gql`

mutation MyMutation {
  insert_cards(objects: {trip_id: 3, type: "Front"}) {
    returning {
      id
    }
  }
}
`;

export default ({refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add front card')}
            onCompleted={refetch}
            mutation={ADD_FRONT}
        >

            {(addFront, {loading, error}) => {

                return <wired-button elevation="2" onClick={ addFront }>
                            Add Front
                        </wired-button>

            }}
        </Mutation>

    </div>
}
