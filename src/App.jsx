import { useState, useRef, useEffect } from 'react'
import { Image } from './components'
import { motion, useTransform, useScroll, useAnimate, transform  } from 'framer-motion';

function App() 
{
  const [images, setImages] = useState(  [
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
      url: "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTg2fHxjYXJzfGVufDB8fDB8fHww"
    },
    {
      url: "https://images.unsplash.com/photo-1600099260176-341fb0d9a6ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxjYXJzfGVufDB8fDB8fHww"
    }
  ])

  function imagesAppearAnimation()
  {
    const [scope, animate] = useAnimate();

    useEffect(() => 
    {
      animate('.image-div', { transform: "scale(1)"}, { duration: 1, ease:[0.85, 0, 0.15, 1], delay: 1})
      animate('.image-div', { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, { duration: 1.2, ease:[0.85, 0, 0.15, 1], delay: 1})

    }, []);

    return scope;
  }

  const scope = imagesAppearAnimation();

  return (
  <>
    <section className="flex justify-center align-center w-full" ref={scope}> 
      <motion.div className="parent flex  flex-col overflow-hidden  gap-4 will-change-transform">
        {images.map(img => 
          <Image src={img.url} />)
        }
      </motion.div>
    </section>
  </>
  )
}

export default App
 