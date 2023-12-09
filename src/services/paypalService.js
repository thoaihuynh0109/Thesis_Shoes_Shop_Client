import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/orders';
const paypalApiUrl = process.env.REACT_APP_PAYPAL_API_URL; // Replace with your actual PayPal API URL

const paypalService = {
    getAllOrder: async () => {
        try {
            const response = await axios.get(apiUrl + '/');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getOrderById: async (id) => {
        try {
            const response = await axios.get(apiUrl + `/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    createOrder: async (data) => {
        try {
            const response = await axios.post(apiUrl + '/', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    // Your existing methods...

    // New method to create a PayPal order
    createPayPalOrder: async (cart) => {
        try {
            const response = await axios.post(`${paypalApiUrl}/api/orders`, { cart });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    // New method to capture a PayPal order
    capturePayPalOrder: async (orderID) => {
        try {
            const response = await axios.post(`${paypalApiUrl}/api/orders/${orderID}/capture`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default paypalService;
