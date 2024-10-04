import React, { useState, useEffect } from 'react';
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TutorialCardComponent = ({ tutorial, onCardClick }) => (
  <Card onClick={() => onCardClick(tutorial)}>
    <Image src={tutorial.thumbnailUrl} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{tutorial.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{tutorial.description}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content style={{ display: 'flex', justifyContent: 'space-around' }} extra>
      <div>
        <Icon name='star' />
        4.9 Stars
      </div>
      <Card.Description>{tutorial.username}</Card.Description>
    </Card.Content>
  </Card>
);

const TutorialModal = ({ tutorial, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>{tutorial?.title}</Modal.Header>
    <Modal.Content>
      <video width="100%" controls>
        <source src={tutorial?.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Modal.Description>
        <p>{tutorial?.description}</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);


const TutorialsShowcase = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  useEffect(() => {
    const fetchTutorials = async () => {
      const querySnapshot = await getDocs(collection(db, 'tutorials'));
      setTutorials(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTutorials();
  }, []);

  const handleCardClick = (tutorial) => {
    setSelectedTutorial(tutorial);
  };

  return (
    <div style={{ margin: '25px 85px', padding: '20px 40px' }}>
      <h2>Featured Tutorials</h2>
      <Card.Group itemsPerRow={3}>
        {tutorials.map((tutorial, index) => (
          <TutorialCardComponent key={index} tutorial={tutorial} onCardClick={handleCardClick} />
        ))}
      </Card.Group>
      <TutorialModal 
        tutorial={selectedTutorial} 
        open={!!selectedTutorial} 
        onClose={() => setSelectedTutorial(null)} 
      />
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button style={{ margin: '15px auto 0px auto' }} primary>See all tutorials</Button>
      </div>
    </div>
  );
}

export default TutorialsShowcase;