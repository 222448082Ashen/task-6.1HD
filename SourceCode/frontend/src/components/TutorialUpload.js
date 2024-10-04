import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

const TutorialUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video || !thumbnail) return;

    try {
      const videoRef = ref(storage, `tutorials/${video.name}`);
      const thumbnailRef = ref(storage, `thumbnails/${thumbnail.name}`);
      
      await uploadBytes(videoRef, video);
      await uploadBytes(thumbnailRef, thumbnail);

      const videoUrl = await getDownloadURL(videoRef);
      const thumbnailUrl = await getDownloadURL(thumbnailRef);

      await addDoc(collection(db, 'tutorials'), {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        views: 0,
        rating: 0,
        createdAt: new Date()
      });

      window.alert('Tutorial uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideo(null);
      setThumbnail(null);
    } catch (error) {
      console.error("Error uploading tutorial: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Form.TextArea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Form.Input
        type="file"
        label="Video"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        required
      />
      <Form.Input
        type="file"
        label="Thumbnail"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        required
      />
      <Button type="submit">Upload Tutorial</Button>
    </Form>
  );
};

export default TutorialUpload;