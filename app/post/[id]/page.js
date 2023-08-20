import React from 'react';
import { getOnePosts } from '@/actions/postActions';
import PostCard from '@/components/PostCard';

const PostDetails = async ({ params: { id }, searchParams }) => {
  console.log(id);
  const post = await getOnePosts(id);
  return <div>{post && <PostCard post={post} />}</div>;
};
export default PostDetails;
