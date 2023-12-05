import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/products';

const productService = {
    getAllProduct: async () => {
        const data = await fetch(apiUrl + '/')
            .then((response) => response.json())
            .then((data) => data);

        return data;
    },
    getLastestProduct: async () => {
        try {
            const response = await axios.get(apiUrl + '/lastest-products');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    getProductByCategory: async (category) => {
        try {
            // router.get('/categories/:category', ProductController.getByCategory);
            const response = await axios.get(apiUrl + `/categories/${category}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductById: async (id) => {
        try {
            const response = await axios.get(apiUrl + `/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    createProduct: async (data) => {
        try {
            const response = await axios.post(apiUrl + '/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const respone = await axios.delete(apiUrl + `/${id}`);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productService;
