'use client';
import { useState, useRef } from 'react';
import PhotoCard from './PhotoCard';
import ButtonSubmit from './ButtonSubmit';
import { revalidate, uploadPhoto } from '@/actions/uploadActions';

const UploadForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleInputFiles(e) {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith('image/')) {
        return file;
      }
    });
    setFiles((prev) => [...newFiles, ...prev]);
    formRef.current.reset();
  }
  async function handleDeleteFiles(index) {
    const newFiles = [...files].filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload() {
    if (!files.length) return alert('No image files are selected.');
    //if (files.length > 3) return alert('Upload up to 3 image files.');
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const res = await uploadPhoto(formData);
    if (res?.msg) console.log(`Success${res?.msg}`);
    if (res?.errMsg) console.log(`Error${res?.errMsg}`);
    setFiles([]);
    formRef.current.reset();
    revalidate('/');
  }
  return (
    <form action={handleUpload} ref={formRef}>
      <div style={{ background: '#ddd', minHeight: 200, margin: '10px 0', padding: 10 }}>
        <input type="file" accept="image/*" multiple onChange={handleInputFiles} />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {files.map((file, index) => (
            <PhotoCard
              key={index}
              url={URL.createObjectURL(file)}
              onClick={() => handleDeleteFiles(index)}
            />
          ))}
        </div>
      </div>
      <ButtonSubmit value="Upload to cloudinary" />
    </form>
  );
};
export default UploadForm;
