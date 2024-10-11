import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function JobListings({ jobData: initialJobData }) {
  const [fetchedJobData, setFetchedJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Initial Job Data:', initialJobData);

    if (!initialJobData || initialJobData.length === 0) { 
      const fetchJobListings = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/job-listings`, {
            params: { what: 'restaurant', where: 'US' },
          });
          setFetchedJobData(response.data);
        } catch (err) {
          setError('Failed to fetch job listings');
        } finally {
          setLoading(false);
        }
      };
      fetchJobListings();
    } else {
      setLoading(false);
    }
  }, [initialJobData]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const dataToDisplay = initialJobData && initialJobData.length > 0 ? initialJobData : fetchedJobData;

  console.log('Data to Display:', dataToDisplay);

  const sortedJobData = dataToDisplay
    ? [...dataToDisplay].sort((a, b) => {
        const dateA = new Date(a[6]);
        const dateB = new Date(b[6]);
        return dateA - dateB;
      })
    : [];

  if (loading) return <p className='loading'>Loading job listings...</p>;
  if (error) return <p className='error'>{error}</p>;

  return (
    <div className="job-listings">
      <h2>Job Listings</h2>
      <button className='new-search' onClick={() => navigate('/')}>
        New Search
      </button>
      <div className="job-listing-container">
        {sortedJobData && sortedJobData.length > 0 ? (
          sortedJobData.map((job, index) => (
            <div key={index} className="job-listing-details">
              <p><strong>Title:</strong> {job[0]}</p>
              <p><strong>Company:</strong> {job[1]}</p>
              <p><strong>Location:</strong> {job[2]}</p>
              <p><strong>Salary Range:</strong> {job[4]}</p>
              <p><strong>Link:</strong> <a href={job[5]} target="_blank" rel="noopener noreferrer">Apply Here</a></p>
              <p><strong>Posted Date:</strong> {formatDate(job[6])}</p>
            </div>
          ))
        ) : (
          <p className='error'>No job data available.</p>
        )}
      </div>
    </div>
  );
}
