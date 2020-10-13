import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
//import Button from './../button/Button'

import './style.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const cardGroups = [
    {
        name: 'Week 1',
        children: [
            { name: 'Day 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae sem tortor.' },
            { name: 'Day 2', text: 'Ut pretium nibh augue, quis egestas ligula suscipit a. Integer sed quam vitae risus cursus ultricies.' },
        ]
    },
    {
        name: 'Week 2',
        children: [
            { name: 'Day 3', text: 'Duis eros eros, condimentum eget gravida sit amet, dignissim non diam.' },
        ]
    },
    {
        name: 'Week 3',
        children: [
            { name: 'Day 1', text: 'Integer vitae purus sed lorem faucibus vulputate vitae quis sem.' },
            { name: 'Day 4', text: 'Aenean condimentum at elit eget feugiat. Aliquam erat volutpat.' },
            { name: 'Day 5', text: 'Quisque eget urna vitae eros sagittis mattis.' },
        ]
    }
];

const CardGroupScroll = (props) => {
    useEffect(() => {
        gsap.utils.toArray('.card-group-header').forEach((el) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'bottom+=100px bottom',
                    endTrigger: el.parentNode.querySelector('.card-group-content'),
                    // end: () => '+=' + (el.parentNode.querySelector('.card-group-content').offsetHeight - 600),
                    toggleActions: 'restart none none reverse',
                    pin: true,
                    pinSpacing: false,
                    scrub: 1
                }
            })
            tl.to(el, { alpha: 0, duration: 2, delay: 10 }, '+=1');
        });
    }, []);

    const handleToggleScrolling = () => {
        props.onPauseScrolling();
    };

    return (
        <div>
            {cardGroups.map((cardGroup, index) => (
                <div className="card-group" key={index}>
                    <header className="card-group-header">
                        <h2>Header of card: {cardGroup.name}</h2>
                    </header>
                    <div className="card-group-content">
                        {cardGroup.children.map((children, childrenIndex) => (
                            <section className="card-group-item" key={childrenIndex}>
                                <h3>{children.name}</h3>
                                <p>{children.text}</p>
                                <button onClick={handleToggleScrolling}>
                                    {props.isPauseScrolling ? 'Resume scrolling' : 'Pause scrolling'}
                                </button>
                            </section>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardGroupScroll;
