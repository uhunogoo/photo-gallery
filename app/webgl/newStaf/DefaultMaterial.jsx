function DefaultMaterial({ ...delegated }) {
  const params = {
    roughness: 0.4,
    metalness: 0.5,
    envMapIntensity: 1.5
  }
  return (
    <meshPhysicalMaterial {...params} {...delegated} />
  ); 
}

export default DefaultMaterial;