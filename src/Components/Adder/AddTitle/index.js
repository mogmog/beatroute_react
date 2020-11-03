import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const ADD = gql`

mutation MyMutation {
  insert_cards(objects: {trip_id: 3, type: "Title"}) {
    returning {
      id
    }
  }
}
`;

export default ({refetch}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not add title card')}
            onCompleted={refetch}
            mutation={ADD}
        >

            {(add, {loading, error}) => {

                return <wired-button elevation="2" onClick={ add }>
                            Add Title
                        </wired-button>

            }}
        </Mutation>

    </div>
}
