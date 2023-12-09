import React, { useState, useEffect } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import orderService from '~/services/orderServices';

function PayPalCheckoutButton(props) {
    const { product } = props;
    const navigate = useNavigate();
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const cartItems = useSelector((state) => state.cart.cartItems);
    // console.log('Cart List: ', cartItems);
    const tax = 2;

    const getTotalPrice = () => {
        // Assuming the current currency is VND and you want to convert it to USD
        const exchangeRate = 24300; // Replace with your actual exchange rate

        const totalPriceVND = cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 48600);

        // console.log('Price in VND:', totalPriceVND);
        // const totalWithTaxVND = totalPriceVND * (1 + tax / 100);
        const totalWithTaxVND = Math.ceil((totalPriceVND * (1 + tax / 100)) / 1000) * 1000;
        // console.log('Price VND with Tax:', totalWithTaxVND.toLocaleString());

        // Convert totalPriceVND to USD
        const totalPriceUSD = (totalWithTaxVND / exchangeRate).toFixed(2);
        // console.log('Price in USD:', totalPriceUSD);
        return totalPriceUSD;
    };

    // get user data from local storage
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');

    // Fetch user data from local storage
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user')) || [];
        setUserData(storedUserData);
        setUserId(storedUserData._id); // Assuming userId is part of the user data
        console.log('storedUserData._id: ', storedUserData._id);
    }, []);

    const handleApprove = (orderId) => {
        // call backend function to fulfill the order
        // if respone is success

        // setPaidFor(true);
        setShowToast(true);
        // Navigate to the home page after 2 seconds
        setTimeout(() => {
            navigate('/');
        }, 4000);
        // refresh users's account or subscription status
    };

    // tiến hành thanh toán
    const handleSubmitOrder = async () => {
        // Check if a payment method is selected

        const order = {
            owner: userData._id,
            // Cần phải có thông tin về sản phẩm trong đơn hàng
            items: cartItems.map((item) => {
                return {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                };
            }),
            /* Số tiền đơn hàng */
            totalAmount: getTotalPrice(),
            paymentMethod: 'paypal',
            /* Phí vận chuyển */
            shippingFee: 48600,
            status: 'processing',
        };

        console.log('information of order: ', order);
        try {
            const checkoutOrder = await orderService.createOrder(order);
            console.log('checkoutOrder: ', checkoutOrder);
            if (checkoutOrder) {
                // order successfully
                setShowToast(true);
                setToastMessage('Thanks so much for your order by COD!');
                setTypeMessage('success');
                // after 2,5s clicking order button will redirect to '/' Home
                setTimeout(() => {
                    navigate('/');
                }, 2500);
                // Check if the selected payment method is Cash On Delivery
            }
        } catch (error) {
            console.error('Error during order creation:', error);
            // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
        }
    };

    return (
        <>
            <PayPalButtons
                style={{
                    color: 'silver',
                    layout: 'horizontal',
                    minHeight: 48,
                    width: '200px',
                    tagLine: false,
                    shape: 'pill',
                }}
                onClick={(data, actions) => {
                    // Validate on button click, client or server side
                    const hasAlreadyBoughtCourse = false;

                    if (hasAlreadyBoughtCourse) {
                        setError(
                            'You already bought this course. Go to your account to view your list of courses.',
                        );

                        return actions.reject();
                    } else {
                        return actions.resolve();
                    }
                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                payer_id: product.userId,

                                amount: {
                                    value: product.price,
                                },
                                name: product.name,
                                quantity: '1',

                                shipping: 48600,
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log('order', order);
                    setShowToast(true);
                    setToastMessage('Thanks so much for your order!');
                    setTypeMessage('success');
                    handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                    setError(err);
                    setShowToast(true);
                    setToastMessage('There Is No Product To Checkout!!!');
                    setTypeMessage('warning');
                    console.error('PayPal Checkout onError', err);
                }}
            />
            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </>
    );
}

export default PayPalCheckoutButton;
