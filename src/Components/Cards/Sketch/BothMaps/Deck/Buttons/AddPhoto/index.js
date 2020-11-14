import React, {useState, useEffect, Fragment} from 'react';
import { CloudinaryContext, Image } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "./../../../../../../../util/cloudinary";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";

const SAVE_PHOTO = gql`
   mutation insert_card_asset($objects: [card_asset_insert_input!]! ) {
        insert_card_asset(objects: $objects) {
            returning {
                id
            }
        }
    }
`;

function App({card}) {
    const [images, setImages] = useState([])

    const beginUpload = (tag, cb) => {

        const uploadOptions = {
            cloudName: "db8uwhsbg",
            tags: [tag, 'beatroute'],
            uploadPreset: "ml_default"
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {

                if(photos.event === 'success'){

                    cb({variables : {objects :  [photos].map(p => ({card_id : card.id, type :"PHOTO", data :p}))}});

                    setImages([...images, photos])
                }
            } else {
                console.log(error);
            }
        })
    }

    useEffect( () => {
        fetchPhotos("image", setImages);
    }, [])

    return (

        <div>

            <Mutation
                onError={() => alert({message: 'Could not add photo'})}
                onCompleted={()=> {alert('you saved a photo')}}
                mutation={SAVE_PHOTO}
            >

                {(savephoto, {loading, error}) => {

                    return <Fragment>
                        <button onClick={() => beginUpload("image", savephoto)}>Upload Image</button>
                    </Fragment>

                }}
            </Mutation>


        </div>

    );
}

export default App;

