import { getAllPosts } from '@/actions/postActions';
import connectDB from '@/utils/database';
import Post from '@/models/postModel';

export default async function sitemap() {
  await connectDB();
  const baseURL = '';
  const posts = await Post.find({});
  const postUrls = posts?.map((post) => ({
    url: `${baseURL}/post/${post._id}`,
    lastModified: post.updatedAt,
  }));

  return [
    { url: baseURL, lastModified: new Date() },
    { url: `${baseURL}/about`, lastModified: new Date() },
    ...postUrls,
  ];
}
