import axios from 'axios';
const API_URL = 'http://edunet.tranonline.ml';

export default class apiService{

    getuser() {
        const url = `${API_URL}/api/user/public/6054ab6cd312670345e19e89`;
        return axios.get(url).then(response => response.data);
    }
}