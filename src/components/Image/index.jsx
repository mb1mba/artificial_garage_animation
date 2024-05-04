import { motion } from "framer-motion";
import { forwardRef } from "react";
import { Element } from "react-scroll";

function Image({src, y, i}, ref)
{
  return (
    <Element
     className="image-div w-[500px] h-[500px] flex justify-center items-center" 
     style={{clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)"}}
     ref={ref}
     name={i}
    >
      <motion.img
        style={{y}}  
        className="object-contain" 
        src={src}
      />
    </Element>
  )
}

export default forwardRef(Image)