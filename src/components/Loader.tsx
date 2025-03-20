import React from 'react';
import Image from 'next/image';
import LoaderGif from '../../public/gif.gif';

interface ILoader{
  className?:string
}

const Loader = ({className}:ILoader) => {
  return (
    <div className="flex  justify-center w-full h-screen">
      <Image src={LoaderGif} width={25} height={25} alt="spinner" className={`${className} h-6 w-6` } />
    </div>
  );
}

export default Loader;
