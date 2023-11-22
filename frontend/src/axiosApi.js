import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:5000/api', // Asegúrate de cambiar esto por la URL base de tu API
});

export default axiosApi;
