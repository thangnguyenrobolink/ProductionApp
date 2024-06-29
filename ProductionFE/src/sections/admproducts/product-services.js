import axios from 'axios';
import { toast } from 'react-toastify';

const productsFromApi = async () => {
    const API_URL = 'http://127.0.0.1:8000/api/products/';
    const token = localStorage.getItem('accessToken'); // Retrieve the token from localStorage

    if (!token) {
        console.error('No access token found in localStorage');
        return [];
    }
    
    try {
        const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
        if (!response.status === 'ok') {
            toast.error(`HTTP error! Status: ${response.status}`);
        }
    
    
        // Assuming the API returns an array of users, adjust fields as necessary
        const products = response.data.results.map(product => ({
            id: product.id,
            code: product.prod_code,
            description: product.prod_fullname,
            packweight: product.pack_size, 
            type: product.barcode,
            exp:  product.exp,
            market:  product.market,
          }));
          toast.success('Load Products successful!', { autoClose: 500 });
        return products;
        }
    catch (error) {
        toast.error('Error fetching product:', error);
        return [];
    }
}
export { productsFromApi };