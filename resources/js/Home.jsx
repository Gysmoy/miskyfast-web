import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Banner from './Components/Home/Banner';
import HowItWorks from './Components/Home/HowItWorks';
import Categories from './Components/Home/Categories';
import Testimonies from './Components/Home/Testimonies';
import Brands from './Components/Home/Brands';
import DriverModal from './Components/Home/DriverModal';
import RestaurantModal from './Components/Home/RestaurantModal';

const Home = (properties) => {
  const { categories } = properties

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  return <Base {...properties} onOpenRestaurantForm={() => setIsRestaurantModalOpen(true)} onOpenDriverForm={() => setIsDriverModalOpen(true)}>
    <Banner />
    <HowItWorks />
    <Categories items={categories} />
    <Testimonies />
    <Brands />
    <RestaurantModal isOpen={isRestaurantModalOpen} onClose={() => setIsRestaurantModalOpen(false)} />
    <DriverModal isOpen={isDriverModalOpen} onClose={() => setIsDriverModalOpen(false)} />
  </Base>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Home {...properties} />);
})