import React from 'react';
import { Navbar } from '../components/Navbar';
import Hero from '../components/Hero';
import ChatLive from '../components/ChatLive';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ChatLive role="admin" />
    </>
  );
};

export default Home;
