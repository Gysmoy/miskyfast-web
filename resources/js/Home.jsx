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
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    userType: 'restaurant'
  });

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu interés! Te contactaremos pronto.');
  };

  return <Base {...properties} onOpenRestaurantForm={() => setIsRestaurantModalOpen(true)} onOpenDriverForm={() => setIsDriverModalOpen(true)}>
    <Banner />
    <HowItWorks />
    <Categories />
    <Testimonies />
    <Brands />

    <RestaurantModal isOpen={isRestaurantModalOpen} onClose={() => setIsRestaurantModalOpen(false)} />
    <DriverModal isOpen={isDriverModalOpen} onClose={() => setIsDriverModalOpen(false)} />
  </Base>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Home {...properties} />);
})