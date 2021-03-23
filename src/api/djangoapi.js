import axios from 'axios';
const API_URL = 'http://45.64.126.93:8000';

export default class djangoService{

    getKP() {
        const url = `${API_URL}/api/KPs-nested/`;
        return axios.get(url).then(response => response.data);
    }
}