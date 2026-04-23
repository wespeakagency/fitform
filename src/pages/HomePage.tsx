import React from 'react';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Packages } from '@/sections/Packages';
import { Pricing } from '@/sections/Pricing';
import { MyBookings } from '@/sections/MyBookings';
import { Team } from '@/sections/Team';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Packages />
      <Pricing />
      <MyBookings />
      <FAQ />
      <Contact />
    </>
  );
};