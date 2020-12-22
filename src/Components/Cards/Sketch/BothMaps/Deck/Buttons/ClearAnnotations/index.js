import React, {useState, useEffect, Fragment} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./../../../../../../../util/cloudinary";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

const CLEAR = gql`
  mutation MyMutation($card_id : Int, $annotations : jsonb) {
  update_cards(where: {id: {_eq: $card_id}}, _set: {annotations: $annotations}) {
    returning {
      id
    }
  }
}

`;

function App({card, refetch}) {

    return (

        <div>

            <Mutation
                onError={() => alert({message: 'Could not clear annotation'})}
                onCompleted={()=> {refetch()}}
                mutation={CLEAR}
                variables={{card_id : card.id, annotations : null}}
            >

                {(clear, {loading, error}) => {

                    return <Fragment>
                        <button onClick={() => clear()}>clear annotations</button>
                    </Fragment>

                }}
            </Mutation>


        </div>

    );
}

export default App;

