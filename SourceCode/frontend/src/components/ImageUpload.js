import React, { useState } from 'react';
import { Image, Form } from 'semantic-ui-react';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      onImageUpload(url);
    }
  };

  return (
    <div>
      <label>Add an Image :</label>
      <div style={{ width: '100%', margin: '10px 0', display: 'inline-flex', gap: '20px', justifyItems: 'center' }}>
        <input type="file" onChange={handleImageChange} />
        <Form.Button onClick={handleUpload}>Upload</Form.Button>
      </div>
      {imageUrl && <Image src={imageUrl} size="medium" />}
    </div>
  );
};

export default ImageUpload;