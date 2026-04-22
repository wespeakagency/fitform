import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Schedule } from '../components/Schedule';
import { Pricing } from '../components/Pricing';
import { Team } from '../components/Team';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
        <Hero />
        <About />
        <Team />
        <Pricing />
        <FAQ />
        <Contact />
    </>
  );
};