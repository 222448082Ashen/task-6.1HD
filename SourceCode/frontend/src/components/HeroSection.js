import React from 'react';
import { Image } from 'semantic-ui-react';

import heroImage from '../assets/hero.jpg';

const HeroSection = () => {
  return (
    <Image src={heroImage} fluid />
  );
}

export default HeroSection;
