import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/brands';

const brandService = {
    // Su dung api nay tai trang user.js
    getAllBrand: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getBrandById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    // createBrand: async (data) => {
    //     try {
    //         const respone = await axios.post(apiUrl + '/', data);
    //         return respone;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // updateBrand: async (id, data) => {
    //     try {
    //         const respone = await axios.put(apiUrl + `/${id}`, data);
    //         return respone;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    // deleteBrand: async (id) => {
    //     try {
    //         const respone = await axios.delete(apiUrl + `/${id}`);
    //         return respone;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
};

export default brandService;
