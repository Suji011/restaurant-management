import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax';
function ParallaxBanner1() {
  return (
    <>
   {/* <ParallaxBanner
      layers={[
        { image: 'https://blog.hotelogix.com/content/images/size/w2000/2023/10/kot.png', speed: -20 },
        { image: '/static/banner-foreground.png', speed: -100 },
      ]}
      className="aspect-[2/1]" style={{ height: '300px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-8xl text-white font-thin">Hello World</h1>
      </div>
    </ParallaxBanner> */}
    <ParallaxBanner
      layers={[
        { image: "https://www.syntacticsinc.com/wp-content/uploads/2021/09/5284.jpg", speed: -20 },
        {  //https://www.aces.edu/wp-content/uploads/2020/02/Background-healthy-food.-Fresh-fruits-vegetables-fish-berries-and-cereals.-Healthy-food-diet-and-healthy-life-concept.-Top-view-1089759056_6000x2000-scaled.jpeg
            // https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.srilanka-places.com%2Fplaces%2Fcafe-chill-ella-90090&psig=AOvVaw2G3wbVEcOvm0ndydrdHW0T&ust=1712069229707000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCEg4ShoYUDFQAAAAAdAAAAABAf
          speed: -15,
          children: (
            <div className="absolute inset-0 flex items-center z-1 justify-center">
              <h1 className="text-8xl text-white "></h1>
            </div>
          ),
        },
        
      ]}
      className="aspect-[2/1] bg-image" 
      style={{ height: '300px', filter: 'grayscale(25%)' }}
    />

    
  </>
  )
}

export default ParallaxBanner1