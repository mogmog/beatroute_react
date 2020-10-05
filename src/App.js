import React, {Fragment, useState} from 'react';

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";

import gql from "graphql-tag";

const GETCARD = gql`
                query {
   
                    page {
                      user_id
                      layout
                      timestamp
                      layout 
                      cards {
                        card {
                          id
                          html
                          type
                          camera
                        }
                      }
                        
                      
                    }
                    
                  }
                

`

export default class WebMapView extends React.Component {

    state = { selectedCardSet : null };

    httpLink = new HttpLink({ uri: 'https://beatroute2019.herokuapp.com/v1/graphql' });

    client = new ApolloClient({ link: (this.httpLink), cache: new InMemoryCache() });

    render () {

        //return <Editor/>

        const data = {"page":[{"user_id":123,"layout":"WoodFrame","timestamp":"2020-04-01T00:00:00+00:00","cards":[{"card":{"id":100,"html":"Northumbria 2021","type":"FrontCover","camera":{"x":2553700.249376615,"y":-1.115334886935115e-9,"z":9000673.36695155},"__typename":"cards"},"__typename":"card_positions"},{"card":{"id":97,"html":"Week 1","type":"Chapter","camera":{"x":4553700.249376615,"y":-1.115334886935115e-9,"z":9000673.36695155},"__typename":"cards"},"__typename":"card_positions"},{"card":{"id":101,"html":"","type":"PhotoCard","camera":null,"__typename":"cards"},"__typename":"card_positions"}],"__typename":"page"}]}

       // return <ScrollTrigger cards={ data.page[0].cards.map(d => d.card)} />



        if (true) return <Fragment>

            <ApolloProvider client={this.client}>
                {/*<ScrollTrigger cards={ [{id : '1' , type : 'FrontCover'}, {id : '2' , type : 'FrontCover'}] } />*/}
                <Query query={GETCARD}  >
                    {({ loading, error, data, refetch  }) => {

                        if (loading || !data) return <span>loading</span>

                        return <span>{JSON.stringify(data)}</span>

                    }}

                </Query>

            </ApolloProvider>

        </Fragment>

    }
}
