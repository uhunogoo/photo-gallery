import React from 'react';
import { BoxGeometry, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from 'three';

export function useImageReference() {
  const geometry = React.useMemo(() =>  new PlaneGeometry( 3.5, 2.9, 1, 1 ), []);
  return geometry;
}
export function useBodyReference() {
  const geometry = React.useMemo(() =>  new BoxGeometry( 4, 4.1, 0.07, 1, 1, 1 ), []);
  return geometry;
}

export function useReference(settings, normalMap, roughnessMap) {
  // Defaults
  const imageLayerGeometry = React.useMemo(() =>  new PlaneGeometry( 3.5, 2.9, 1, 1 ), []);
  const geometry = React.useMemo(() =>  new BoxGeometry( 4, 4.1, 0.07, 1, 1, 1 ), []);
  const material = React.useMemo( () => new MeshStandardMaterial({ color: 0xffffff }), []);

  const updateMaterial = React.useCallback((material) => {
    const params = {
      roughness: 0.4,
      metalness: 0.5,
      envMapIntensity: 1.5,
      ...settings
    }
    // Aplly normalMap
    if ( normalMap ) {
      normalMap.repeat.set(6, 6);
      normalMap.wrapS = RepeatWrapping;
      normalMap.wrapT = RepeatWrapping;
      material.normalMap = normalMap;
      material.normalScale.setScalar( 0.2 );
    }
    // Aplly normalMap
    if (roughnessMap) {
      material.roughnessMap = roughnessMap;
    }
  
    material.roughness = params.roughness;
    material.metalness = params.metalness;
    material.envMapIntensity = params.envMapIntensity;

    return material;
  }, [ settings, normalMap, roughnessMap ]);

  updateMaterial( material );

  return [ material, geometry, imageLayerGeometry ];
}