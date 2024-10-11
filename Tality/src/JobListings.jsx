import React from 'react';

const JobListings = ({ jobData }) => {

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return date.toLocaleDateString(undefined, options); 
  };


  const sortedJobData = jobData
    ? [...jobData].sort((a, b) => {
        const dateA = new Date(a[6]);
        const dateB = new Date(b[6]);
        return dateA - dateB;
      })
    : [];

  return (
    <div className="job-listings">
      <h2>Job Listings</h2>
      <button className='new-search'> New Search</button>
      <div className="job-listing-container">
        {sortedJobData.length > 0 ? (
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
};

export default JobListings;
