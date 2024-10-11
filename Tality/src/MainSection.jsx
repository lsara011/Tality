import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MainSection = ({ setJobData }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when the API call starts

    try {
      const response = await axios.get('https://TalityBE.onrender.com/api/job-listings', {
        params: {
            what: jobTitle,
            where: location,
        },
    });

      if (response.data.message === 'No Jobs Found') {
        setMessage('No Jobs Found');
        setJobData(null);
      } else {
        setJobData(response.data);
        setMessage('');
        navigate('/job-listings');
      }
    } catch (error) {
      console.error('Error fetching job data:', error);
      setMessage('An error occurred while fetching job data.');
    } finally {
      setLoading(false); // Reset loading state to false when the API call is complete
    }
  };

  return (
    <div className="MainSection">
      <div className="mainSection-title">
        <h1>FIND YOUR NEXT OPPORTUNITY IN HOSPITALITY</h1>
      </div>
      
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group1">
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Keywords"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group2">
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="search-button">Search</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};
