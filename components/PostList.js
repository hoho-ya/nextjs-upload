'use client';
import React, { experimental_useOptimistic as useOptimistic } from 'react';
import PostCard from './PostCard';
import { deletePost } from '@/actions/postActions';

const PostList = ({ posts }) => {
  const [optimisticPosts, addOptimisticPosts] = useOptimistic({ posts }, (state, newPosts) => ({
    ...state,
    posts: newPosts,
  }));

  async function handleDelete(postId) {
    if (window.confirm('Do you want to delete this post?')) {
      const newPosts = posts.filter((post) => post._id !== postId);
      addOptimisticPosts((optimisticPosts.posts = newPosts));
      await deletePost(postId);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
      {optimisticPosts.posts.map((post) => (
        <PostCard key={post._id} post={post} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PostList;
