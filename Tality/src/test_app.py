import unittest
from app import app

class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_job_listings(self):
        response = self.app.get('/api/job-listings')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, dict)
        self.assertIn('results', data)

if __name__ == '__main__':
    unittest.main()
#Testing