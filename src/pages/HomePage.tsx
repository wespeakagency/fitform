import React from 'react';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Schedule } from '@/sections/Schedule';
import { Pricing } from '@/sections/Pricing';
import { Team } from '@/sections/Team';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';

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