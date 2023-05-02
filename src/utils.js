import { Vector2 } from 'three';

export function addAspectRatio( images ) {
  if ( images.length ) {
    images.forEach( image => addAspectRatio(image) );
  } else {
    addAspectRatio( images );
  }

  function addAspectRatio( image ) {
    const { data } = image.source;
    
    const aspectRatioH = data.naturalWidth / data.naturalHeight;
    const aspectRatioW = data.naturalHeight / data.naturalWidth;
    const aspectVector = new Vector2(
      Math.max( aspectRatioW, 1 ),
      Math.max( aspectRatioH, 1 )
    );
    image.repeat.set(1, 2);
  }

  return images;
}