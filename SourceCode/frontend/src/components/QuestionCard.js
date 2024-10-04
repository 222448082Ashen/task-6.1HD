import React, { useState } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';

const QuestionCard = ({ question, onDelete, onExpand }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={{ margin: '0' }}>
      <Card.Content style={{ display: 'flex', gap: '7px', flexDirection: 'column' }}>
        <Image src={question.imageUrl} wrapped ui={false} width='100%' />
        <Card.Header>{question.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{question.createdAt.toDate().toLocaleDateString()}</span>
        </Card.Meta>
        <Card.Description>
          {expanded ? question.content : question.content.substring(0, 100) + '...'}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button basic color='blue' onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
          <Button basic color='red' onClick={() => onDelete(question.id)}>
            <Icon name='trash' /> Delete
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;