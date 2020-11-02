import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import './App.less';

import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";

import gql from "graphql-tag";

import Front        from "./Components/Cards/Front";
import PhotosOnMap  from "./Components/Cards/PhotosOnMap";

import SVGScroll from './Components/svg-scroll/SVGScroll';
import CardScroll from './Components/card-scroll/CardScroll';

const GETCARD = gql`
                {
                  page {
                    user_id
                    layout
                    timestamp
                    layout
                    cards(order_by: {position: asc}) {
                      card {
                        id
                        html
                        type
                        map
                        camera
                        content
                      }
                    }
                  }
                }
`

gsap.registerPlugin(ScrollTrigger);

const httpLink = new HttpLink({ uri: 'https://beatroute2019.herokuapp.com/v1/graphql' });

const client = new ApolloClient({ link: (httpLink), cache: new InMemoryCache() });


const sections = [
  {
    title: 'Architecto aliquam',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, ea.'
  },
  {
    title: 'Ceritatis placeat',
    subtitle: 'Dignissimos placeat cupiditate perferendis eaque praesentium similique officia dolore?'
  }
];

const App = () => {

  const [background, setBackground] = useState('#262626');
  const headerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);

  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {

    gsap.to(headerRef.current, { backgroundColor: background, duration: 1,  ease: 'none' });

  }, [background]);

  useEffect(() => {

    gsap.from(headerRef.current, {
      autoAlpha: 0,
      ease: 'none',
      delay: 1
    });

    revealRefs.current.forEach((el, index) => {

      gsap.fromTo(el, {
       // autoAlpha: 0
      }, {
        duration: 1,
        //autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          id: `section-${index+1}`,
          trigger: el,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

    });

  }, []);

  const addToRefs = el => {
    if (el && !revealRefs.current.includes(el)) {
        revealRefs.current.push(el);
    }
  };

  const admin = true;

  return (
    <div className="App">

      <ApolloProvider client={client}>
        {/*<ScrollTrigger cards={ [{id : '1' , type : 'FrontCover'}, {id : '2' , type : 'FrontCover'}] } />*/}
        <Query query={GETCARD}  >
          {({ loading, error, data, refetch  }) => {

            if (loading || !data) return null

            const cards = data.page[0].cards.map(d => d.card);
            const stillLoading = loadedCount < cards.length;

            return <Fragment>

              <main className="App-main">

                <div className="App-section" style={{height : '100%'}}>
                  {stillLoading && <code>loading  please wait</code> }
                </div>

                {cards.map((card, i) => {

                  if (card.type === 'Front') {
                    return <div className="App-section" key={i} ref={addToRefs}>
                             <Front key={i + '' + card.id} card={card} index={i}/>
                           </div>
                  }

                  if (card.type === 'PhotosOnMap') {

                    return  <div className="App-section" key={i} ref={addToRefs}>
                              <PhotosOnMap admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} key={i + '' + card.id} index={i} card={card}/>
                            </div>
                  }

                  if (true && card.type === 'Scroll') {

                    return <SVGScroll />
                    // return <PhotosOnMap
                    //     key={i + '' + card.id}
                    //     index={i}
                    //     card={card}/>
                  }

                  return null;
                })}


              </main>

              {/*<div style={{height  : '2600px', width : '100%', background : 'red'}}>*/}
              {/*    end*/}
              {/*</div>*/}

            </Fragment>

          }}

        </Query>

      </ApolloProvider>

      {/*<main className="App-main">*/}
      {/*  {*/}
      {/*    sections.map(({title, subtitle}) => (*/}
      {/*      <div className="App-section" key={title} ref={addToRefs}>*/}
      {/*        <h2>{title}</h2>*/}
      {/*        <p>{subtitle}</p>*/}
      {/*      </div>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*  <SVGScroll />*/}
      {/*  /!*<CardScroll />*!/*/}
      {/*</main>*/}
    </div>
  );
}

export default App;
