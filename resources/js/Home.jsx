import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Banner from './Components/Home/Banner';
import HowItWorks from './Components/Home/HowItWorks';
import Categories from './Components/Home/Categories';
import Testimonies from './Components/Home/Testimonies';
import Brands from './Components/Home/Brands';

const Home = ({ ...props }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    userType: 'restaurant'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu interés! Te contactaremos pronto.');
  };

  return <>
    <Banner />
    <HowItWorks />
    <Categories />
    <Testimonies />
    <Brands/>
  </>
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})