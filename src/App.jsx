import { useState, useEffect, useRef } from 'react';
import { Image } from "./components";
import {  useTransform, useScroll, useAnimate } from 'framer-motion';
import { ReactLenis } from 'lenis/react'
import { scroller} from 'react-scroll';
import { motion } from 'framer-motion';

function App() 
{
  const scope = appearanceOfImagesAnimation();

  const [imageHeight, setImageHeight] = useState(0);
  const [viewportHeight] = useState(window.innerHeight);
  const [images] = useState([
    {
      url: "https://i.pinimg.com/736x/85/e4/b5/85e4b57c8abe761a10f10a2ae61e853e.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/7d/63/26/7d6326c84ee41911377b3d4d0da97578.jpg"
    },
    {
      url: "https://i.pinimg.com/736x/57/52/31/575231d65bb5ed73bcafca20cb4ba289.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/3d/7c/3a/3d7c3af7dd391903969cac410ab63baa.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/63/7c/cf/637ccfcab947682039f5bdefc6cf581b.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/1f/f1/b5/1ff1b565b58075fc7790771409775ad9.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/99/35/7f/99357f3444d1fc9dfcfd4d14b84d0f74.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/3b/a4/12/3ba4129874c8e07b731c8c015eed1267.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/82/5c/76/825c76e35494dd54a464d4d7edbd758e.jpg"
    },
    {
      url: "https://i.pinimg.com/564x/d2/71/a9/d271a97464e8af2ad8121f55ac470f4e.jpg"
    },
  ])

  const sideContainer = useRef(null);
  const imagesContainer = useRef(null);

  const sideContainerHeight = sideContainer.current?.offsetHeight;

  const { scrollYProgress } = useScroll({
    target: scope,
  });

  const imagesContainerY = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 100]);

  const minimapScroll = useTransform(
    scrollYProgress, 
    [0, 1],
    [viewportHeight / 2 - 96 / 2, -(sideContainerHeight - viewportHeight / 2 - 96 / 2)]);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('resize', () => window.location.reload())
    const imageDiv = document.querySelector('.image-div');
    if (imageDiv) {
      setImageHeight(imageDiv.offsetHeight); 
    }
    return () => window.removeEventListener('resize',  window.addEventListener('resize', () => window.location.reload()));

  }, []);

  function appearanceOfImagesAnimation()
  {
    const [scope, animate] = useAnimate();

    useEffect(() => 
    {
      scrollToElement('5');
      animate('#scale',{ transform: "scale(1)", position: "relative"}, 
      { duration: 2, ease:[0.85, 0, 0.15, 1], delay: 2})
      animate('.image-div', { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"},
      { duration: 2.2, ease:[0.85, 0, 0.15, 1], delay: 2})
      animate('#minimap', { opacity: 1}, { delay: 3.10})
      animate('#scope', { opacity: 1}, { delay: 3.10})
      animate('#minimap-container', { transform: 'translateY(-100%)'}, { delay: 1.5, duration: 3, ease:[0.85, 0, 0.15, 1] })
    }, []);

    return scope;
  }

  function scrollToElement(elementName, duration = 2300) {
    // Perform the smooth scroll
    return scroller.scrollTo(elementName, {
      duration: duration,
      smooth: "easeInOutQuint",
      offset: -(viewportHeight / 2 - imageHeight / 2),
      ignoreCancelEvents: true
    })
  }
  
  return (
    <ReactLenis root options={{ lerp: 0.03, duration: 2 }}>
    <section className="hidden lg:block min-h-screen" ref={scope} style={{ position: 'relative' }}>
      <div id="scale" className="flex justify-center align-center relative lg:py-20 2xl:py-96 z-30" style={{ transform: "scale(.5)", zIndex: 1 }}>
        <div className="flex flex-col gap-4 relative" ref={imagesContainer}>
          {images.map((img, i) => <Image key={img.url + i} src={img.url} i={(i + 1).toString()} y={imagesContainerY} />)}
        </div>
      </div>
      <div className='sticky bottom-0 h-0 z-10 hidden lg:block'>
        <div id="minimap-container" className="relative h-screen w-fit" style={{ left: "10vw" }}>
          <div id="scope" className='border border-solid rounded-md h-[112px] w-24 absolute top-1/2 -left-2 z-20 opacity-0' style={{ transform: 'translateY(-50%)' }}></div>
          <motion.div ref={sideContainer} id="minimap" className='flex flex-col w-fit gap-4 relative will-change-transform opacity-0' style={{ y: minimapScroll }}>
            {images.map((img, i) => <motion.img alt="" key={img.url + i} src={img.url} className='w-20 h-24 object-cover'/>)}
          </motion.div>
        </div>
      </div>
    </section>

    <section className='flex justify-center items-center w-full h-screen lg:hidden'>
      <p className='text-white'>Go on a greater screen please :)</p>
    </section>
  </ReactLenis>
  )
}

export default App
 