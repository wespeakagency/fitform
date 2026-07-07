import React from 'react';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Packages } from '@/sections/Packages';
import { Memberships } from '@/sections/Memberships';
import { Pricing } from '@/sections/Pricing';
import { MyBookings } from '@/sections/MyBookings';
import { Shop } from '@/sections/Shop';
import { Team } from '@/sections/Team';
import { FAQ } from '@/sections/FAQ';
import { Contact } from '@/sections/Contact';
import { useTikTokBsportSearchTracking } from '@/hooks/useTikTokBsportSearchTracking';
import { useTikTokBsportFunnelTracking } from '@/hooks/useTikTokBsportFunnelTracking';

export const HomePage: React.FC = () => {
  useTikTokBsportSearchTracking();
  useTikTokBsportFunnelTracking();

  return (
    <>
      {/* Sticky wrapper: Hero pins at top while About rises over it with
          rounded corners + shadow. The sticky lives here (composition), not
          inside Hero itself, so Hero stays reusable in pages that don't
          want the parallax. */}
      <div className="lg:sticky lg:top-0 lg:z-0">
        <Hero />
      </div>
      <About />
      <Team />
      <Packages />
      <Memberships />
      <Pricing />
      <MyBookings />
      <Shop />
      <FAQ />
      <Contact />
    </>
  );
};
