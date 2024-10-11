import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://lsara011.github.io"]) 

@app.route('/api/job-listings', methods=['GET'])
def get_job():
    api_key = os.getenv('ADZUNA_API_KEY')
    app_id = os.getenv('ADZUNA_APP_ID')

    job_title = request.args.get('what', 'server')  
    location = request.args.get('where', 'US')          
    desired_category = 'hospitality-catering-jobs'      

    all_listings = []
    page_number = 1
    max_listings = 30  
    more_results = True

    while more_results and len(all_listings) < max_listings:
        api_url = f'https://api.adzuna.com/v1/api/jobs/us/search/{page_number}?app_id={app_id}&app_key={api_key}&what={job_title}&where={location}'

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            data = response.json()


            filtered_jobs = [
                job for job in data.get('results', [])
                if desired_category in job.get('category', {}).get('tag', '') and
                (job_title.lower() in job.get('title', '').lower() or
                 job_title.lower() in job.get('description', '').lower())
            ]
            
            all_listings.extend(filtered_jobs)
            if len(filtered_jobs) == 0 or len(all_listings) >= max_listings:
                more_results = False  
            else:
                page_number += 1  

        except requests.RequestException as e:
            print("Error fetching data from Adzuna API:", e)
            return jsonify({'error': 'Error fetching job listings from Adzuna', 'details': str(e)}), 500


    job_listings = [
        [
            job.get('title', 'N/A'),
            job.get('company', {}).get('display_name', 'N/A'),
            job.get('location', {}).get('display_name', 'N/A'),
            job.get('description', 'N/A'),
            f"${job.get('salary_min', 'N/A')} - ${job.get('salary_max', 'N/A')}",
            job.get('redirect_url', 'N/A'),
            job.get('created', 'N/A')
        ]
        for job in all_listings[:max_listings]  
    ]

    if not job_listings:
        return jsonify({'message': 'No Jobs Found'})

    print("Total Job Listings:", len(job_listings))

    return jsonify(job_listings)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
