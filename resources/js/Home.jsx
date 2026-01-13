import React, { useEffect, useState } from 'react';
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
  const { categories, testimonies, brands, prefixes, gmaps_api_key } = properties

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  useEffect(() => {
    if (isRestaurantModalOpen || isDriverModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isRestaurantModalOpen, isDriverModalOpen])

  return <Base {...properties} onOpenRestaurantForm={() => setIsRestaurantModalOpen(true)} onOpenDriverForm={() => setIsDriverModalOpen(true)}>
    <Banner onOpenRestaurantForm={() => setIsRestaurantModalOpen(true)} onOpenDriverForm={() => setIsDriverModalOpen(true)} />
    <HowItWorks />
    <Categories items={categories} />
    <Testimonies items={testimonies} />
    <Brands items={brands}/>
    <RestaurantModal isOpen={isRestaurantModalOpen} onClose={() => setIsRestaurantModalOpen(false)} prefixes={prefixes} gmaps_api_key={gmaps_api_key} />
    <DriverModal isOpen={isDriverModalOpen} onClose={() => setIsDriverModalOpen(false)} prefixes={prefixes} />
  </Base>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Home {...properties} />);
})