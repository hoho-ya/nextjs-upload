'use client';
import React from 'react';
import PhotoCard from './PhotoCard';
import { deletePhoto } from '@/actions/uploadActions';

const PhotoList = ({ photos }) => {
  async function handleDeletePhoto(public_id) {
    await deletePhoto(public_id);
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {photos?.map((photo) => (
        <PhotoCard
          key={photo.public_id}
          url={photo.secure_url}
          onClick={() => handleDeletePhoto(photo.public_id)}
        />
      ))}
    </div>
  );
};
export default PhotoList;
