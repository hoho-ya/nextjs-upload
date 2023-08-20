'use client';
import Image from 'next/image';
import React, { useTransition } from 'react';
const PhotoCard = ({ url, onClick }) => {
  const [isPending, stratTranstion] = useTransition();
  return (
    <>
      <div>
        <Image alt="" src={url} width={100} height={60} />
      </div>
      <div>
        <button type="button" onClick={() => stratTranstion(onClick)}>
          {isPending ? 'Loading...' : 'Delete'}
        </button>
      </div>
    </>
  );
};
export default PhotoCard;
