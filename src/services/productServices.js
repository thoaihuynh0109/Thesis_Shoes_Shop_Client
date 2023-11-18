import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/products';

const productService = {
    getAllProduct: async () => {
        const data = await fetch(apiUrl + '/')
            .then((response) => response.json())
            .then((data) => data);

        return data;
    },
    // viet tiep cac api can thiet phia duoi
    getLastestProduct: async () => {
        try {
            const response = await axios.get(apiUrl + '/lastest-products');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productService;
