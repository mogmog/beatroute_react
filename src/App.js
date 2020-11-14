import React, { Fragment, useRef, useEffect, useState } from 'react';
import { gsap } from "gsap";
import './App.less';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Measure from 'react-measure'

import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";

import gql from "graphql-tag";

import Front        from "./Components/Cards/Front";
import Title        from "./Components/Cards/Title";
import PhotosOnMap  from "./Components/Cards/PhotosOnMap";
import Sketch  from "./Components/Cards/Sketch";
import SVGScroll from './Components/svg-scroll/SVGScroll';

import CardAdder from './Components/Adder';

const GETCARD = gql`
                {
   cards(where: {trip_id: {_eq: 3}}, order_by: {id: asc}) {
    id
    html
    type
    map
    camera
    content
    
    assets {
      data
    }
  }
}

`

const useContainerDimensions = myRef => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

gsap.registerPlugin(ScrollTrigger);

const httpLink = new HttpLink({ uri: 'https://beatroute2019.herokuapp.com/v1/graphql' });

const client = new ApolloClient({ link: (httpLink), cache: new InMemoryCache() });

const App = () => {

  const componentRef = useRef()

  const headerRef                   = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);

  const revealRefs = useRef([]);
  revealRefs.current = [];

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

        <Query query={GETCARD}  >
          {({ loading, error, data, refetch  }) => {

            if (loading || !data) return null

            const cards = data.cards;
            const stillLoading = loadedCount < cards.length;

            return <Fragment>

              <Measure bounds>

                {({ measureRef, contentRect: { bounds: { width }} }) => (

                <main className="App-main">

                  {/*<div className="App-section" style={{height : '100%'}}>*/}
                  {/*  {stillLoading && <code>loading  please wait</code> }*/}
                  {/*</div>*/}

                  {cards.map((card, i) => {

                    if (card.type === 'Front') {
                      return <div className="App-section" key={i} ref={addToRefs}>
                              {admin && <code>{card.id}</code>}
                               <Front key={i + '' + card.id} card={card} index={i}/>
                             </div>
                    }

                    if (card.type === 'Title') {
                      return <div className="App-section" key={i} ref={addToRefs}>
                        {admin && <code>{card.id}</code>}
                        <Title key={i + '' + card.id} card={card} i={i}/>
                      </div>
                    }

                    if (card.type === 'PhotosOnMap') {

                      return  <div className="App-section" key={i} ref={addToRefs}>
                                {admin && <code>{card.id}</code>}
                                <PhotosOnMap width={width} admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} key={i + '' + card.id} index={i} card={card}/>
                              </div>
                    }

                    if (card.type === 'Sketch') {

                      return  <div className="App-section" key={i} ref={addToRefs}>
                        {admin && <code>{card.id}</code>}
                        <Sketch width={width} admin={admin} stillLoading={stillLoading} incrementLoadedCount={() => setLoadedCount(loadedCount + 1)} key={i + '' + card.id} index={i} card={card}/>
                      </div>
                    }

                    if (true && card.type === 'Scroll') {
                      return <SVGScroll />
                    }

                    return null;
                  })}

                  <div className="App-section" style={{height : '100%'}}>
                    test
                    <CardAdder refetch={refetch}/>
                  </div>

                  <div ref={measureRef}>My width is {width}</div>

                </main>

                  )}
              </Measure>

            </Fragment>

          }}

        </Query>

      </ApolloProvider>

    </div>
  );
}

export default App;
