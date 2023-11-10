import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/user';

const userService = {
    // Su dung api nay tai trang user.js
    getAllUser: async () => {
        try {
            const respone = await axios.get(apiUrl + '/getAll');
            console.log(respone.data);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default userService;
