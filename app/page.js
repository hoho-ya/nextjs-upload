import React from 'react';
import UploadForm from '@/components/UploadForm';
import PhotoList from '@/components/PhotoList';
import { getAllPhoto } from '@/actions/uploadActions';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { getAllPosts } from '@/actions/postActions';
import Feature from '@/components/Feature';
import Pagination from '@/components/Pagination';

const Home = async ({ params, searchParams }) => {
  const photos = await getAllPhoto();
  const { posts, totalPage } = await getAllPosts(searchParams);

  return (
    <main>
      <h1>NextJS 13.4 Server Actions + MongoDB(mongoose) | NextJS SEO</h1>
      <p>C.R.U.D + Sort + Search + Pagination</p>
      <PostForm />
      <Feature />
      {posts?.length > 0 && <PostList posts={posts} />}
      {totalPage && <Pagination totalPage={totalPage} />}
      <hr />
      <h1>NextJS Server Actions Upload Image Files to Cloudinary, Mongodb, Mongoose</h1>
      <UploadForm />
      <h1>All Photos</h1>
      <PhotoList photos={photos} />
    </main>
  );
};
export default Home;
