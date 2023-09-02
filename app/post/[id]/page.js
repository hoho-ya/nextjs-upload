import React from 'react';
import { getOnePosts } from '@/actions/postActions';
import PostCard from '@/components/PostCard';

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;
  const post = await getOnePosts(id);

  return {
    title: post.title,
    discription: `This is my description ${post.title} Next.js seo`,
    alternates: {
      canonical: `/post${id}`,
      languages: {
        en: `/en/post/${id}`,
      },
    },
    openGraph: {
      title: `${post.title} | Next.js SEO | DevAT-Korea`,
      images: [
        {
          url: post.image,
          width: 400,
          height: 300,
        },
      ],
    },
  };
}

const PostDetails = async ({ params: { id }, searchParams }) => {
  console.log(id);
  const post = await getOnePosts(id);
  return (
    <div>
      <h1>NextJS SEO - {post.title}</h1>
      {post && <PostCard post={post} />}
    </div>
  );
};
export default PostDetails;
