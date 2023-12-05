import { useState } from 'react';

const useValidation = (initialState) => {
    const [state, setState] = useState({
        value: initialState.value || '',
        message: '',
        isShow: initialState.isShow || false,
    });

    const validateRequired = () => {
        if (state.value.trim() === '') {
            setState({
                ...state,
                message: 'This field is required.',
            });
            return false;
        } else {
            setState({
                ...state,
                message: '',
            });
            return true;
        }
    };

    const validateEmail = () => {
        if (state.value.trim() === '') {
            setState({
                ...state,
                message: 'Please enter an email address.',
            });
            return false;
        } else {
            let validEmail = state.value.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (validEmail) {
                // Additional check for Gmail
                if (state.value.toLowerCase().endsWith('@gmail.com')) {
                    setState({
                        ...state,
                        message: '',
                    });
                    return true;
                } else {
                    setState({
                        ...state,
                        message: 'Must includes @gmail.com in your email',
                    });
                    return false;
                }
            } else {
                setState({
                    ...state,
                    message: 'Invalid email address.',
                });
                return false;
            }
        }
    };

    const validatePassword = () => {
        if (state.value === '') {
            setState({
                ...state,
                message: 'Please enter a password.',
            });
            return false;
        } else if (state.value.length < 6) {
            setState({
                ...state,
                message: 'Password must be at least 6 characters long.',
            });
            return false;
        }
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const validateConfirmPassword = (password) => {
        if (state.value === '') {
            setState({
                ...state,
                message: 'Please confirm your password.',
            });
            return false;
        } else if (state.value !== password) {
            setState({
                ...state,
                message: 'Passwords do not match.',
            });
            return false;
        }
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const validatePhone = () => {
        if (state.value === '') {
            setState({
                ...state,
                message: 'Vui Lòng Nhập Số Điện Thoại',
            });
            return false;
        } else {
            let validPhone = state.value.match(/(0[3|5|7|8|9])+([0-9]{8})\b/g);
            if (validPhone) {
                setState({
                    ...state,
                    message: '',
                });
                return true;
            } else {
                setState({
                    ...state,
                    message: 'Số Điện Chỉ Có 10 Số!',
                });
                return false;
            }
        }
    };

    const validateRequiredWithoutDigits = () => {
        if (/\d/.test(state.value)) {
            setState({
                ...state,
                message: 'Không Được Tồn Tại Số Trong Tên!',
            });
            return false;
        } else if (state.value.trim() === '') {
            setState({
                ...state,
                message: 'This field is required.',
            });
            return false;
        }
        setState({
            ...state,
            message: '',
        });
        return true;
    };

    const handleShow = () => {
        setState({
            ...state,
            isShow: !state.isShow,
        });
    };

    return {
        state,
        setState,
        validateRequired,
        validateEmail,
        validatePassword,
        validateConfirmPassword,
        validatePhone,
        validateRequiredWithoutDigits,
        handleShow,
    };
};

export default useValidation;
