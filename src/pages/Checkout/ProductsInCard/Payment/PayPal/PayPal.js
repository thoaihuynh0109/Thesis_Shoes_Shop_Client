import React, { useRef, useEffect, useState } from 'react';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import { useDispatch, useSelector } from 'react-redux';

export default function Paypal() {
    const paypal = useRef();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // message for after ordering
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const tax = 8.75;
    const getTotalPrice = () => {
        // Assuming the current currency is VND and you want to convert it to USD
        const exchangeRate = 24300; // Replace with your actual exchange rate

        const totalPriceVND = cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price) * item.quantity;
            // const itemPrice = parseFloat(item.price.replace(/,/g, '')) * item.quantity;
            return total + itemPrice;
        }, 0);

        console.log('Price in VND:', totalPriceVND);
        const totalWithTaxVND = totalPriceVND * (1 + tax / 100);
        console.log('Price with Tax:', totalWithTaxVND);
        // Convert totalPriceVND to USD
        const totalPriceUSD = (totalWithTaxVND / exchangeRate).toFixed(2);
        console.log('Price in USD:', totalPriceUSD);
        return totalPriceUSD;
    };

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Checkout at Gimme Store',
                                amount: {
                                    currency_code: 'USD', // Use USD as the currency code
                                    value: getTotalPrice(), // Invoke the function to get the total price
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setShowToast(true);
                    setToastMessage('Thanks so much for your order!');
                    setTypeMessage('success');
                    console.log(order);
                },
                onError: (err) => {
                    setShowToast(true);
                    setToastMessage('There is no product to checkout!');
                    setTypeMessage('warning');
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, [cartItems]); // Trigger the useEffect when cartItems change

    return (
        <div>
            <div ref={paypal}></div>
            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </div>
    );
}
