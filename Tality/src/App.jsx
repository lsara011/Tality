import './App.css';
import { Header } from './Header';
import { Footer } from './Footer';
import { AboutUs } from './AboutUs';
import { CareerResource } from './CareerResources';
import { MainSection } from './MainSection';
import { JobListings } from './JobListings';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [jobData, setJobData] = useState(null); 
  return (
    <Router basename='/Tality/'>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection setJobData={setJobData} />} /> 
        <Route path="/job-listings" element={<JobListings jobData={jobData} />} />
        <Route path="/career-resources" element={<CareerResource/>} />
        <Route path="/about-us" element={<AboutUs/>} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;