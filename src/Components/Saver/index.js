import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const SAVE_CARD = gql`

mutation( $card_id : Int,  $camera : jsonb){
                update_cards(where: {id: {_eq: $card_id}}, _set: {camera: $camera}) {
                    returning {
                                camera
                                id
                              }
                    }
                }
`;

export default ({children}) => {

    return <div>

        <Mutation
            onError={() => alert('Could not save camera')}
            mutation={SAVE_CARD}
             >

            {(update, {loading, error}) => {

                return <Fragment>
                                        {children(update, loading, error)}
                       </Fragment>

                //return <div>loading</div>
            }}
        </Mutation>

    </div>
}
