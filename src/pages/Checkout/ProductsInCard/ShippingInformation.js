import React, { useState, useEffect, useRef } from 'react';
import { CircularProgress } from '@mui/material'; // loading icon
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomizeButtonPersonalAccount } from '~/pages/ClientPages/Profile/PersonalAccount';
import useValidation from '~/components/UseValidation/useValidation';
import { CustomizeTextField } from '~/components/CustomizeTextField/CustomizeTextField';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';
import { ToastMessage2 } from '~/components/MakeProductCards/MakeProductCards';
import orderService from '~/services/orderServices';

import PaymentStep from './Payment/index';
import ShippingStep from './ShippingStep';
import { useDispatch, useSelector } from 'react-redux';

function ShippingInformation() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector((state) => state.cart.cartItems);
    // console.log('Cart List: ', cartItems);
    const tax = 2;

    const { deliveryAddress } = location.state || {};

    // get user data from local storage
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState('');

    // show toast message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    // wait continue loading
    const [isLoading, setIsLoading] = useState(false);

    const [fullName, setFullName] = useState(deliveryAddress?.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(deliveryAddress?.phoneNumber || '');
    const [address, setAddress] = useState(deliveryAddress?.address || '');
    // show Shipping Method
    const [isInformationFilled, setIsInformationFilled] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

    // Create instances of useValidation hook -- check validation
    const fullNameValidation = useValidation({ value: fullName });
    const phoneNumberValidation = useValidation({ value: phoneNumber });
    const addressValidation = useValidation({ value: address });

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

    // Fetch user data from local storage
    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user')) || [];
        setUserData(storedUserData);
        setUserId(storedUserData._id); // Assuming userId is part of the user data
        console.log('storedUserData._id: ', storedUserData._id);
    }, []);

    // Populate the state variables with the retrieved user data
    useEffect(() => {
        //get data from local storage and assign it into these textfields below
        setFullName(userData?.firstName + ' ' + userData?.lastName || '');

        setAddress(userData?.address || '');
        setPhoneNumber(userData?.phone || '');
    }, [userData]);

    // check validate for fields data get from the local storage
    useEffect(() => {
        fullNameValidation.setState({ ...fullNameValidation.state, value: fullName });
    }, [fullName, fullNameValidation]);
    useEffect(() => {
        phoneNumberValidation.setState({ ...phoneNumberValidation.state, value: phoneNumber });
    }, [phoneNumber, phoneNumberValidation]);
    useEffect(() => {
        addressValidation.setState({ ...addressValidation.state, value: address });
    }, [address, addressValidation]);

    const handleContinue = async () => {
        // Set loading to true when starting the async action
        setIsLoading(true);

        // Validate each field
        const isFullNameValid = fullNameValidation.validateRequiredWithoutDigits();
        const isPhoneNumberValid = phoneNumberValidation.validatePhone();
        const isAddressValid = addressValidation.validateRequired();

        console.log('Validation Results:', {
            isFullNameValid,
            isPhoneNumberValid,
            isAddressValid,
        });

        if (isFullNameValid && isPhoneNumberValid && isAddressValid) {
            // Continue with registration logic
            console.log('Validation succeeded');
            console.log({ fullName, address, phoneNumber });

            // Save the address to local storage
            const selectedAddress = {
                fullName,
                phoneNumber,
                address,
            };

            try {
                // Simulate an asynchronous action (e.g., API call)
                await new Promise((resolve) => setTimeout(resolve, 2500));

                // Update the address in the local state of ShowDeliveryInformation
                navigate('/checkout-page', { state: { deliveryAddress: selectedAddress } });
                // Set the state to indicate that information is filled
                setIsInformationFilled(true);
            } catch (error) {
                console.error('Error during async action:', error);
                // Handle error, show error message, etc.
            } finally {
                // Set loading back to false when the async action completes (whether success or failure)
                setIsLoading(false);
            }
        } else {
            // Handle validation errors
            console.log('Validation failed. Please check again.');
            // Set loading back to false when the async action completes (whether success or failure)
            setIsLoading(false);
        }
    };

    // Back to the previous page
    function goBack() {
        window.history.back();
    }

    const handleUpdateAddress = () => {
        navigate('/profile');
    };

    // tiến hành thanh toán
    const handleSubmitOrder = async () => {
        // Check if a payment method is selected
        if (selectedPaymentMethod) {
            console.log('Selected Payment Method:', selectedPaymentMethod);
            console.log('Total Price: ', getTotalPrice());

            const order = {
                owner: userData._id,

                // Cần phải có thông tin về sản phẩm trong đơn hàng
                items: cartItems.map((item) => {
                    return {
                        images: item.images,
                        size: item.size,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                    };
                }),

                /* Số tiền đơn hàng */
                totalAmount: getTotalPrice(),
                paymentMethod: selectedPaymentMethod,
                /* Phí vận chuyển */
                shippingFee: 48600,
                status: 'processing',
            };

            console.log('Owner id:', order.owner);

            // console.log('Order Free: ', order.totalAmount);

            console.log('Order just payment: ', order);

            try {
                const checkoutOrder = await orderService.createOrder(order);
                console.log('checkoutOrder: ', checkoutOrder);

                if (checkoutOrder) {
                    // order successfully
                    setShowToast(true);
                    setToastMessage('Thanks so much for your order by COD!');
                    setTypeMessage('success');
                    // after 2,5s clicking order button will redirect to '/' Home
                    // setTimeout(() => {
                    //     navigate('/');
                    // }, 2500);

                    // Check if the selected payment method is Cash On Delivery
                    if (selectedPaymentMethod === 'cod') {
                        try {
                            // Simulate an asynchronous action (e.g., API call)
                            await new Promise((resolve) => setTimeout(resolve, 2500));
                            console.log('Order placed successfully for Cash On Delivery');
                        } catch (error) {
                            console.error('Error during async action:', error);
                            // Handle error, show error message, etc.
                        }
                    } else if (selectedPaymentMethod === 'paypal') {
                        const order2 = {
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
                            paymentMethod: 'paypal23',
                            /* Phí vận chuyển */
                            shippingFee: 48600,
                            status: 'processing',
                        };
                        const checkoutOrder2 = await orderService.createOrder(order2);
                        // console.log('checkoutOrder: ', checkoutOrder2);

                        // Proceed with the order logic for PayPal
                        console.log('Order placed successfully for PayPal');
                    }
                    console.log('Order placed successfully');
                }
            } catch (error) {
                console.error('Error during order creation:', error);
                // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
            }
        } else {
            // If no payment method is selected, show an error message
            console.log('Selected Payment Method:', selectedPaymentMethod);
            // Show a toast message for not selecting a payment method
        }
    };

    return (
        <Box sx={{ minHeight: '800px', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mt: 3, mb: 4, fontWeight: 'bold' }}>
                Shipping Address
            </Typography>

            {/* input field */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 12 }}>Người Nhận Hàng</CustomTypography>
                <CustomizeTextField
                    disabled
                    label={'Người Nhận Hàng'}
                    textField={'Họ tên người nhận hàng'}
                    value={fullName}
                    wd={600}
                    onChange={(e) => {
                        setFullName(e.target.value);
                        fullNameValidation.setState({
                            ...fullNameValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={fullNameValidation.validateRequiredWithoutDigits}
                    error={fullNameValidation.state.message !== ''}
                    helperText={fullNameValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 15 }}>Số Điện Thoại</CustomTypography>
                <CustomizeTextField
                    disabled
                    label={'Số Điện Thoại'}
                    textField={'Số Điện Thoại'}
                    wd={600}
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        phoneNumberValidation.setState({
                            ...phoneNumberValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={phoneNumberValidation.validatePhone}
                    error={phoneNumberValidation.state.message !== ''}
                    helperText={phoneNumberValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <CustomTypography sx={{ mr: 11 }}>Địa Chỉ Nhận Hàng</CustomTypography>
                <CustomizeTextField
                    disabled
                    label={'Địa Chỉ Nhận Hàng'}
                    textField={'Địa Chỉ Nhận Hàng'}
                    value={address}
                    wd={600}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        addressValidation.setState({
                            ...addressValidation.state,
                            value: e.target.value,
                        });
                    }}
                    variant="outlined"
                    onBlur={addressValidation.validateRequired}
                    error={addressValidation.state.message !== ''}
                    helperText={addressValidation.state.message}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            fontSize: '12px', // Adjust the font size as needed
                        },
                    }}
                />
            </Box>

            <Box
                sx={{
                    width: '805px',

                    ml: '230px',
                }}
            >
                <ShippingStep />
            </Box>

            {/* check if these field are empty */}
            {isLoading ? (
                // Show a loading spinner while processing the action
                <Box>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* loading */}
                        <CircularProgress
                            sx={{
                                mt: 2,
                            }}
                        />
                    </Typography>
                    <Typography
                        sx={{ textAlign: 'center', mt: 2, fontSize: '14px', fontWeight: '600' }}
                    >
                        Loading...
                    </Typography>
                </Box>
            ) : isInformationFilled ? (
                // hide 2 buttons: Contine and Back
                <Box></Box>
            ) : (
                <Box display="flex" justifyContent={'center'} alignItems={'center'}>
                    <CustomizeButtonPersonalAccount
                        variant="contained"
                        onClick={handleContinue}
                        sx={{ pl: 4, pr: 4, mt: 2 }}
                    >
                        Continue
                    </CustomizeButtonPersonalAccount>

                    <CustomizeButtonPersonalAccount
                        variant="contained"
                        onClick={handleUpdateAddress}
                        sx={{ pl: 4, pr: 4, mt: 2 }}
                    >
                        Update Address
                    </CustomizeButtonPersonalAccount>

                    <CustomizeButtonPersonalAccount
                        variant="outlined"
                        sx={{
                            // p: '4px 48px',
                            pl: 4,
                            pr: 4,

                            mt: '14px',
                        }}
                        onClick={goBack}
                    >
                        Back
                    </CustomizeButtonPersonalAccount>
                </Box>
            )}

            {/* isInformationFilled is true and click button continue */}
            {isInformationFilled && (
                // show payment step
                <Box>
                    {/* choose shipping method */}
                    <Box sx={{ ml: 29 }}>
                        <PaymentStep
                            onSelectPaymentMethod={(selectedMethod) =>
                                setSelectedPaymentMethod(selectedMethod)
                            }
                        />
                    </Box>

                    {/* button continue to payment */}
                    {selectedPaymentMethod !== 'paypal' && (
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
                            <CustomizeButtonPersonalAccount
                                variant="outlined"
                                sx={{
                                    mt: '20px',
                                    mr: 35,
                                    padding: '8px 30px',
                                    textTransform: 'capitalize',
                                }}
                                onClick={handleSubmitOrder}
                            >
                                Order
                            </CustomizeButtonPersonalAccount>
                        </Box>
                    )}
                </Box>
            )}

            {/* show toast message */}
            <ToastMessage2
                message={toastMessage}
                type={typeMessage}
                showToast={showToast}
                setShowToast={setShowToast}
            />
        </Box>
    );
}

export default ShippingInformation;
