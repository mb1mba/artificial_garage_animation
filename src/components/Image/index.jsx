export default function Image({src})
{
  return (
    <div
     className="image-div overflow-hidden w-[500px] h-[500px] flex justify-center items-center" 
     style={{clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)", transform:"scale(.5)"}}
    >
      <img  
        className="object-contain" src={src}
        style={{transform: "scale()"}}
      />
    </div>
  )
}