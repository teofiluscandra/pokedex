import NextImage from 'next/image';
import { useState } from 'react';

const Image = ({src, ...props}) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  }

  return (
    <NextImage
      src={src}
      onLoadingComplete={onLoadCallback}
      className={`transition duration-1000 ${isReady ? 'blur-0 scale-100' : 'blur-2xl scale-120'}`}
      {...props}
    />
  )
}

export default Image;
