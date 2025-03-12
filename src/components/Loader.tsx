import React from 'react';
import Image from 'next/image';
import LoaderGif from '../../public/loader.gif';

interface ILoader{
  className?:string
}


const Loader = ({className}:ILoader) => {
  return (
    <div className="flex  justify-center">
      <Image src={LoaderGif} width={25} height={25} alt="spinner" className={className} />
    </div>
  );
}

export default Loader;
