'use server';
import Post from '@/models/postModel';
import { revalidatePath } from 'next/cache';

export async function createPost(data) {
  try {
    const newPost = new Post(data);
    await newPost.save();
    revalidatePath('/');

    return { ...newPost._doc, _id: newPost._id.toString() };
  } catch (error) {
    return { errMsg: error.message || 'Failed to create post!' };
  }
}

export async function updatePost({ title, image, id }) {
  try {
    const post = await Post.findByIdAndUpdate(id, { title, image });
    revalidatePath('/');

    return { ...newPost._doc, _id: post._id.toString() };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function deletePost(postId) {
  try {
    const post = await Post.findByIdAndDelete(postId, { new: true });
    revalidatePath('/');

    return { ...newPost._doc, _id: post._id.toString() };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function getAllPosts(searchParams) {
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'createdAt';
  const limit = searchParams.limit * 1 || 2;
  const page = searchParams.page * 1 || 1;
  const skip = searchParams.skip * 1 || limit * (page - 1);

  try {
    const posts = await Post.find({ title: { $regex: search } })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const count = await Post.find({ title: { $regex: search } }).count();
    const totalPage = Math.ceil(count / limit);

    const newData = posts.map((post) => ({
      ...post._doc,
      _id: post._doc._id.toString(),
    }));

    return { posts: newData, count, totalPage };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function getOnePosts(postId) {
  try {
    const post = await Post.findById(postId);

    return { ...post._doc, _id: post._id.toString() };
  } catch (error) {
    return { errMsg: error.message };
  }
}
