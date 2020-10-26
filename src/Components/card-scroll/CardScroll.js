import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './style.css';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae sem tortor.' },
    { text: 'Ut pretium nibh augue, quis egestas ligula suscipit a. Integer sed quam vitae risus cursus ultricies.' },
    { text: 'Duis eros eros, condimentum eget gravida sit amet, dignissim non diam.' },
    { text: 'Integer vitae purus sed lorem faucibus vulputate vitae quis sem.' },
    { text: 'Aenean condimentum at elit eget feugiat. Aliquam erat volutpat.' },
    { text: 'Quisque eget urna vitae eros sagittis mattis.' }
];

const CardScroll = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState();

    useEffect(() => {
        cards.forEach((card, index) => {
            const cardId = '#' + createCardId(index);

            gsap.fromTo(cardId, { autoAlpha: 0 }, {
                scrollTrigger: {
                    trigger: cardId,
                    onEnter: (self) => {
                        setCurrentCardIndex(index);
                    },
                    onEnterBack: (self) => {
                        setCurrentCardIndex(index);
                    },
                    onLeave: (self) => {
                        setCurrentCardIndex(undefined);
                    },
                    onLeaveBack: () => {
                        setCurrentCardIndex(undefined);
                    },
                    start: 'top center+=100',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                //autoAlpha: 1,
                ease: 'none',
            })
        });
    }, []);

    const createCardId = (index) => `card-scroll-${index}`;

    return (
        <div>
            {cards.map((card, index) => (
                <div
                    id={createCardId(index)}
                    className="card-scroll App-section"
                    key={index}
                >
                    <div>Index: {index}</div>
                    <p>{card.text}</p>
                </div>
            ))}
            {currentCardIndex !== undefined && (
                <div className="card-scroll--active">
                    Card {currentCardIndex} in the viewport
                </div>
            )}
        </div>
    );
};

export default CardScroll;
