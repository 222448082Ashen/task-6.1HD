import React, { useState, useEffect } from 'react';
import { Container, Input, Dropdown } from 'semantic-ui-react';
import { db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import QuestionCard from '../components/QuestionCard';
import HeaderBar from '../components/HeaderBar';
import FooterComponent from '../components/FooterComponent';

const FindQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedQuestions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setQuestions(fetchedQuestions);
    setFilteredQuestions(fetchedQuestions);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    setQuestions(questions.filter(q => q.id !== id));
    setFilteredQuestions(filteredQuestions.filter(q => q.id !== id));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterQuestions(term, sortBy);
  };

  const handleSort = (value) => {
    setSortBy(value);
    filterQuestions(searchTerm, value);
  };

  const filterQuestions = (term, sort) => {
    let filtered = questions.filter(q =>
      q.title.toLowerCase().includes(term) ||
      q.content.toLowerCase().includes(term)
    );

    if (sort === 'date') {
      filtered.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    } else if (sort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <HeaderBar />
      <Container style={{ margin: '20px 0', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <Input
          icon='search'
          placeholder='Search questions...'
          onChange={handleSearch}
          fluid
        />
        <Dropdown
          selection
          options={[
            { key: 'date', text: 'Sort by Date', value: 'date' },
            { key: 'title', text: 'Sort by Title', value: 'title' },
          ]}
          value={sortBy}
          onChange={(_, { value }) => handleSort(value)}
        />
        <div style={{ width: '100%', gap: '20px', display: 'inline-flex', flexWrap: 'wrap', margin: '0', justifyContent: 'space-evenly' }}>
          {filteredQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </Container>
      <FooterComponent />
    </div>
  );
};

export default FindQuestions;