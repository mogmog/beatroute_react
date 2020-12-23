import React from 'react';

import './index.less';

export default function Index() {
    const getRandomDeg = (i) => {
        if (i % 2 === 0) return (Math.random() - 1.5) * 4;

        return (Math.random()) * 8;

    };

    return (
        <div className="mask-mode-container">

            {Array(3).fill(1).map((_, i) => (
                <div key={i}  className='frame' style={{ transform: `rotate(${getRandomDeg(i)}deg)`}}>
                    <div className="mask-mode" >
                       <div >
                            <img src={process.env.PUBLIC_URL + '/textures/bird.png'} alt="" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
