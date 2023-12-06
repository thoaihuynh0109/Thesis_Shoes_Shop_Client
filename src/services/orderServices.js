import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/orders';

const orderService = {
    // Su dung api nay tai trang user.js
    getAllOrder: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },

    getOrderById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },

    createOrder: async (data) => {
        try {
            const respone = await axios.post(apiUrl + '/', data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },

    updateUserProfile: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}/profile`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (id) => {
        try {
            const respone = await axios.delete(apiUrl + `/${id}`);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
};

export default orderService;
