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
    checkEmailAvailability: async (email) => {
        try {
            const response = await axios.get(apiUrl + '/check-email-availability', {
                params: {
                    email: email,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return { available: true };
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
    // createUser: async (data) => {
    //     try {
    //         const respone = await axios.post(apiUrl + '/', data);
    //         return respone;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    createUser: async (data) => {
        try {
            const response = await axios.post(apiUrl + '/', data);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // The server responded with a 400 status
                // You can extract more details from error.response.data
                const errorMessage =
                    error.response.data.message || 'Registration failed due to validation errors.';
                return { success: false, error: errorMessage };
            } else {
                // Handle other errors (network issues, server errors, etc.)
                console.error('Error creating user:', error);
                return { success: false, error: 'An unexpected error occurred.' };
            }
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

export default userService;
