# ecss-jobs

Django:
rest_framework to allow serializers for JSON responses
django-cors-headers to allow cross origin resource sharing i.e. React can retrieve resources from django

React:
"proxy": "http://localhost:8000"
In TSConfig, development proxy to provide an origin (backend) to automatically route urls to
e.g. axios.get('/api/jobs/listing') => axios.get('http://localhost:8000/api/jobs/listing')
