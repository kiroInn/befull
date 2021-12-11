import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

axios.defaults.baseURL = 'http://be-full.com';
