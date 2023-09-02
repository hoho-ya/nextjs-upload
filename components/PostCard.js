'use client';
import React, { useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMyContext } from '@/context/Provider';

const PhotoCard = ({ post, handleDelete }) => {
  const { setEditPost } = useMyContext();
  const [isPending, stratTranstion] = useTransition();

  return (
    <div>
      <Link href={`/post/${post._id}`}>
        <Image src={post?.image} width={200} height={200} size="20vw" alt="image" />
        <h3>{post?.title}</h3>
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => setEditPost(post)}>
          Edit
        </button>
        <button type="button" onClick={() => stratTranstion(() => handleDelete(post._id))}>
          {isPending ? 'Loading...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};
export default PhotoCard;
