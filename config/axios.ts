import axios from 'axios'

const clienteAxios = axios.create({
    baseURL : process.env.BASE_URL
      
});

export default clienteAxios