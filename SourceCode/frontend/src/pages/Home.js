import React from 'react';
import HeaderBar from './../components/HeaderBar';
import HeroSection from './../components/HeroSection';
import ArticlesGrid from './../components/ArticlesGrid';
import TutorialsShowcase from './../components/TutorialsShowcase';
import NewsletterSection from './../components/NewsletterSection';
import FooterComponent from './../components/FooterComponent';
import 'semantic-ui-css/semantic.min.css';

const MainPage = () => {
  return (
    <div>
      <HeaderBar />
      <HeroSection />
      <ArticlesGrid />
      <TutorialsShowcase />
      <NewsletterSection />
      <FooterComponent />
    </div>
  );
}

export default MainPage;