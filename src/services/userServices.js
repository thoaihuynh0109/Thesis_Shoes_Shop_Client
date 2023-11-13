import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/users';

const userService = {
    // Su dung api nay tai trang user.js
    getAllUser: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getUserById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default userService;
