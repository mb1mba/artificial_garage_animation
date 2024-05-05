import { useState, useEffect, useRef } from 'react';
import { Image } from "./components";
import {  useTransform, useScroll, useAnimate } from 'framer-motion';
import { ReactLenis } from 'lenis/react'
import { scroller} from 'react-scroll';
import { motion } from 'framer-motion';

function App() 
{
  const scope = imagesAppearAnimation();

  const { scrollYProgress } = useScroll({
    target: scope,
    layoutEffect: false
  });

  const [images, setImages] = useState([
    {
      url: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1522932467653-e48f79727abf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1569240651611-302c9897bde5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1565064012199-c537fe6fb4b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHxjYXJzfGVufDB8fDB8fHww"
    },
    {
      url: "https://images.unsplash.com/photo-1610631902787-291ccb71df30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg4fHxjYXJzfGVufDB8fDB8fHww"
    },
    {
      url: "https://images.unsplash.com/photo-1565064012199-c537fe6fb4b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHxjYXJzfGVufDB8fDB8fHww"
    },
    {
      url: "https://images.unsplash.com/photo-1600099260176-341fb0d9a6ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxjYXJzfGVufDB8fDB8fHww"
    },
    {
      url: "https://images.unsplash.com/photo-1555353540-64580b51c258?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1522932467653-e48f79727abf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
    {
      url: "https://images.unsplash.com/photo-1569240651611-302c9897bde5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGNhcnN8ZW58MHx8MHx8fDA%3D"
    },
  ])

  function imagesAppearAnimation()
  {
    const [scope, animate] = useAnimate();

    useEffect(() => 
    {
      scroller.scrollTo('5', {
        duration: 2300,
        smooth: true,
        block: "center",
        offset: -(window.innerHeight / 2 - 500 / 2)
      });
      animate('.scale',{ transform: "scale(1)", position: "relative"}, { duration: 2, ease:[0.85, 0, 0.15, 1], delay: 2})
      animate('.image-div', { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, { duration: 2.2, ease:[0.85, 0, 0.15, 1], delay: 2})
    }, []);

    return scope;
  }

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sideImagesY = useTransform(scrollYProgress, [0, 1], [window.innerHeight / 2, -250]);

  return (
  <>
    <ReactLenis root options={{ lerp: 0.075, duration: 2}}>
      <motion.section
        className="min-h-screen" 
        ref={scope}
        style={{ position: 'relative' }}
      >
         <div 
          className="scale flex justify-center align-center relative"        
          style={{transform: "scale(.5)", zIndex: 1}}
          >
          <div className="flex flex-col overflow-hidden gap-4 relative">
          {
          images.map((img, i) => {
            return (
              <>
                <Image 
                  key={img.url + i}
                  src={img.url} 
                  i={i.toString()}
                  y={imageY}
                />
              </>
            )})
          }
          </div>
        </div> 
  
        <div  className='sticky bottom-0 h-0'>
          <div className="-translate-y-full relative">
            <div className='border border-solid h-24 w-24 absolute top-1/2  z-10'></div>
            <motion.div 
            className='flex flex-col w-fit relative will-change-transform' 
            style={{ y: sideImagesY}}
            >
              {images.map((img, i) => {
                  return (
                    <img 
                      key={img.url + i}
                      src={img.url} 
                      className='w-20 h-24'
      
                    />
                )})}
            </motion.div>
            </div>
        </div>
      </motion.section>
    </ReactLenis>
  </>
  )
}

export default App
 