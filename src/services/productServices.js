const apiUrl = process.env.REACT_APP_API_URL + '/products';

const productService = {
    getAllProduct: async () => {
        const data = await fetch(apiUrl + '/')
            .then((response) => response.json())
            .then((data) => data);

        return data;
    },
    // viet tiep cac api can thiet phia duoi
};

export default productService;
