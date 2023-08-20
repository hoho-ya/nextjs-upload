'use server';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import cloudinary from 'cloudinary';
import { revalidatePath } from 'next/cache';
import Photo from '@/models/photoModel';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function savePhotosToLocal(formData) {
  const files = formData.getAll('files');

  const multipleBuffersPromise = files.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split('/')[1];
      //const uploadDir = path.join(process.cwd(), 'public', `${name}.${ext}`);

      const tmpdir = os.tmpdir();
      const uploadDir = path.join(tmpdir, `${name}.${ext}`); //work in Vercel

      fs.writeFile(uploadDir, buffer);
      return {
        filepath: uploadDir,
        filename: file.name,
      };
    })
  );

  return await Promise.all(multipleBuffersPromise);
}
async function uploadPhotosToCloudinary(newFiles) {
  const multiplePhotosPromise = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, { folder: 'nextjs_upload' })
  );
  return await Promise.all(multiplePhotosPromise);
}

export async function uploadPhoto(formData) {
  try {
    // Save photo files to temp folder
    const newFiles = await savePhotosToLocal(formData);
    const photos = await uploadPhotosToCloudinary(newFiles);

    //newFiles.map((file) => fs.unlink(file.path));

    const newPhotos = photos.map((photo) => {
      return new Photo({ public_id: photo.public_id, secure_url: photo.secure_url });
    });

    await Photo.insertMany(newPhotos);
    //await delay(2000);
    //revalidatePath('/');

    return { msg: 'Upload Success!' };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function deletePhoto(public_id) {
  try {
    // await cloudinary.v2.uploader.destroy(public_id);

    await Promise.all([
      Photo.findOneAndDelete({ public_id }),
      cloudinary.v2.uploader.destroy(public_id),
    ]);
    revalidatePath('/');

    return { msg: 'Delete Success!' };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function getAllPhoto() {
  try {
    // const { resources } = await cloudinary.v2.search
    //   .expression('folder:nextjs_upload/*')
    //   .sort_by('created_at', 'desc')
    //   .max_results(500)
    //   .execute();

    // From Mongodb
    const photos = await Photo.find().sort('-createdAt');
    const resources = photos.map((photo) => ({ ...photo._doc, _id: photo._id.toString() }));

    return resources;
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function revalidate(path) {
  revalidatePath(path);
}

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
