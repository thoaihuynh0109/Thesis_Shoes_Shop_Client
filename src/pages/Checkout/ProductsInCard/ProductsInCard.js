import React, { useState, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Stepper, Step, StepButton, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import classNames from 'classnames/bind';
import styles from './ProductsInCard.module.scss';
import PageNotFound from '~/pages/NotFound/PageNotFound';
import SummaryStep from './SummaryStep';
import AddressStep from './AddressStep';
import ShippingStep from './ShippingStep';
import PaymentStep from './Payment';
import SignIn from '~/components/SignIn';

// Order state
const steps = ['Summary', 'Sign In', 'Address', 'Shipping', 'Payment'];

const cx = classNames.bind(styles);

const CustomTypography = styled(({ fontSize, fontWeight, ...rest }) => <Typography {...rest} />)(
    ({ fontSize, fontWeight }) => ({
        fontSize: fontSize || '16px',
        fontWeight: fontWeight || 'normal',
    }),
);

const CustomButton = styled(Button)(({ fontSize }) => ({
    fontSize: fontSize || '15px', // Thay đổi giá trị '12px' thành '24px' hoặc giá trị tùy chỉnh khác
}));

// zoom number in stepper
const CustomStepButton = styled(StepButton)(() => ({
    '& .MuiStepIcon-text': {
        fontSize: '12px', // Adjust the font size as desired
    },
}));

const CustomStepper = styled(Stepper)(({ theme }) => ({
    '& .MuiStepIcon-root': {
        width: '20',
        height: '20',
        borderRadius: '50%',
        fontSize: '24px',
    },
}));

function ProductsInCard() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    // const [currentStepName, setCurrentStepName] = useState(''); // for 2 step: Home > Shop > GiayNam

    // display name for each step
    const [stepHeaders, setStepHeaders] = useState([
        'Shopping-cart summary', // step 0
        'Authentication', // step 1
        'Address', // step 2
        'Shipping', // step 3
        'Payment', // step 4
    ]);

    const navigate = useNavigate();

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleContinueShopping = () => {
        navigate('/shop');
    };

    const handleNext = () => {
        // Check if the current step (activeStep) is greater than 0
        // If yes, check if the previous step (activeStep - 1) is completed
        if (activeStep > 0 && !completed[activeStep - 1]) {
            // If the previous step is not completed, show a message or take appropriate action
            console.log('Please complete the previous step before proceeding.');
        } else {
            // Proceed to the next step as usual
            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    // const handleNext = () => {
    //     const newActiveStep =
    //         isLastStep() && !allStepsCompleted()
    //             ? // It's the last step, but not all steps have been completed,
    //               // find the first step that has been completed
    //               steps.findIndex((step, i) => !(i in completed))
    //             : activeStep + 1;
    //     setActiveStep(newActiveStep);
    // };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // click on step name to see information of step
    // const handleStep = (step) => () => {
    //     setActiveStep(step);
    // };

    const location = useLocation();

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        // <Container sx={{ width: '100%' }}>
        <Box sx={{ width: '100%' }}>
            {/* ứng với mỗi step thì sẽ hiện thị từng nội dung header của step tương ứng */}

            <CustomTypography fontSize="24px" fontWeight="bold" sx={{ mb: 2, mt: 2 }}>
                {stepHeaders[activeStep]}
            </CustomTypography>

            {/* label for each step */}
            <CustomStepper nonLinear activeStep={0}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <CustomStepButton
                            fontSize="36px"
                            color="inherit"
                            // onClick={handleStep(index)}
                        >
                            <CustomTypography>{label}</CustomTypography>
                        </CustomStepButton>
                    </Step>
                ))}
            </CustomStepper>

            <div>
                {/* Done all step  */}
                {allStepsCompleted() ? (
                    <Box>
                        <Fragment>
                            <CustomTypography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </CustomTypography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </Fragment>
                    </Box>
                ) : (
                    <Fragment>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <CustomTypography sx={{ mt: 2, mb: 1, py: 1 }}>
                                {/* Step {activeStep + 1} */}
                                <b>Step</b> <i>{stepHeaders[activeStep]}</i>
                            </CustomTypography>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <CustomTypography
                                        variant="caption"
                                        sx={{ display: 'inline-block' }}
                                        fontSize="100px"
                                    >
                                        Step {activeStep + 1} already completed
                                    </CustomTypography>
                                ) : (
                                    <CustomButton onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </CustomButton>
                                ))}
                        </Box>
                        {activeStep === 0 && <SummaryStep />}
                        {/* {activeStep === 0 && <PaymentStep />} */}

                        <Box className={cx('my-account-container2')}>
                            {activeStep === 1 && <SignIn />}
                        </Box>
                        {activeStep === 2 && <AddressStep />}
                        {activeStep === 3 && <ShippingStep />}
                        {activeStep === 4 && <PaymentStep />}

                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {/* Return to the Shopping Page and Continue to Shopping */}
                            {/* {renderStepContent(activeStep)} */}
                            <CustomButton
                                color="inherit"
                                onClick={handleContinueShopping}
                                sx={{ mr: 1 }}
                            >
                                Continue Shopping
                            </CustomButton>
                            {/* <CustomButton
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </CustomButton> */}
                            <Box sx={{ flex: '1 1 auto' }} />

                            {/* {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <CustomTypography
                                        variant="caption"
                                        sx={{ display: 'inline-block' }}
                                        fontSize="100px"
                                    >
                                        Step {activeStep + 1} already completed
                                    </CustomTypography>
                                ) : (
                                    <CustomButton onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? 'Finish'
                                            : 'Complete Step'}
                                    </CustomButton>
                                ))} */}
                        </Box>
                    </Fragment>
                )}
            </div>
        </Box>
    );
}

export default ProductsInCard;
