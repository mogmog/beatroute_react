import React, { useEffect } from 'react';
import gsap from 'gsap';

import './style.less';

const UnderlayBackground = (props) => {
  useEffect(() => {
    const handleZoomBackground = (event) => {
      if (props.isPauseScrolling) {
        gsap.killTweensOf('#underlay-background-image');

        if (event.deltaY > 0) {
          gsap.to('#underlay-background-image', {
            scale: 0.8,
            rotation: '360deg',
          });
        } else {
          gsap.to('#underlay-background-image', {
            scale: 1
          });
        }
      }
    };

    window.addEventListener('wheel', handleZoomBackground);

    return () => {
      window.removeEventListener('wheel', handleZoomBackground);
    };
  }, [props.isPauseScrolling]);

  return (
    <div className="underlay-background">
      <img
        id="underlay-background-image"
        src="https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg"
        width="100%"
        height="100%"
        alt=""
      />
    </div>
  );
}

export default UnderlayBackground;

