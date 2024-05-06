import { motion } from "framer-motion";
import { Element } from "react-scroll";

function Image({src, y, i})
{
  return (
    <Element
     className="image-div  w-[500px] h-[500px] flex justify-center items-center relative overflow-hidden" 
     style={{clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)"}}
     name={i.toString()}
    >
      <motion.img
        style={{y}}
        whileHover={{ transform: 'scale(1.02)',  transition: { duration: 0.2, ease: "easeInOut" }}}
        className="object-cover object-center cursor-pointer pointer-events-none" 
        src={src}
      />
    </Element>
  )
}

export default Image