import React from "react";

function DefaultMaterial({ ...delegated }, ref) {
  const params = {
    roughness: 0.4,
    metalness: 0.5,
    envMapIntensity: 1.5
  }
  return (
    <meshPhysicalMaterial ref={ref} {...params} {...delegated} />
  ); 
}

export default React.forwardRef( DefaultMaterial );