import React, {Fragment} from 'react';
import {message, notification} from "antd";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const SAVE_TABLE = gql`

mutation( $card_id : Int,  $camera : jsonb){
                update_cards(where: {id: {_eq: $card_id}}, _set: {camera: $camera}) {
                    returning {
                                camera
                                id
                              }
                    }
                }
`;

const SAVE_MAP = gql`

mutation( $card_id : Int,  $map : jsonb){
                update_cards(where: {id: {_eq: $card_id}}, _set: {map: $map}) {
                    returning {
                                camera
                                id
                              }
                    }
                }
`;

const SAVE_ANNOTATION = gql`

mutation( $card_id : Int,  $annotations : jsonb){
                update_cards(where: {id: {_eq: $card_id}}, _set: {annotations: $annotations}) {
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
            onError={() => alert('Could not save map')}
            mutation={SAVE_MAP}
        >

            {(updateMap, {loading, error}) => {

                return  <Mutation
                    onError={() => alert('Could not save camera')}
                    mutation={SAVE_TABLE}
                >

                    {(updateCamera, {loading, error}) => {

                        return <Fragment>
                                    <Mutation
                                        onError={() => alert('Could not save camera')}
                                        mutation={SAVE_ANNOTATION}
                                    >

                                        {(updateAnnotation, {loading, error}) => {

                                            return <Fragment>
                                                {children(updateCamera, updateMap, updateAnnotation, loading, error)}
                                            </Fragment>
                                        }}
                                    </Mutation>
                        </Fragment>
                    }}
                </Mutation>

            }}
        </Mutation>


    </div>
}
