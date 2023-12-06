import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import orderService from '~/services/orderServices';
import CustomTypography from '~/components/CustomTyporaphy/CustomTyporaphy';

export default function FormOrderDetail({ handleClose, id }) {
    const [order, setOrder] = React.useState({});

    React.useEffect(() => {
        async function fetchOrder() {
            const order = await orderService.getOrderById(id);
            setOrder(order);
        }
        fetchOrder();
    }, []);

    return (
        <React.Fragment>
            <Dialog open={true} onClose={handleClose}>
                <DialogTitle sx={{ fontSize: '3rem' }}>{'Order Details'}</DialogTitle>
                {order && (
                    <DialogContent sx={{ width: '600px' }}>
                        <Box>
                            <CustomTypography>ID: {order._id}</CustomTypography>
                            <CustomTypography>Sản phẩm: </CustomTypography>
                            {order.items?.length > 0 &&
                                order.items.map((item) => {
                                    return (
                                        <>
                                            <CustomTypography>
                                                "{item.name}" "{item.price}" "{item.quantity}"
                                            </CustomTypography>
                                        </>
                                    );
                                })}
                            <CustomTypography>Tổng: </CustomTypography>
                            <CustomTypography>{order.totalAmount}</CustomTypography>
                            <CustomTypography>Phương thức thanh toán: </CustomTypography>
                            <CustomTypography>{order.paymentMethod}</CustomTypography>
                            <CustomTypography>Phí giao hàng: </CustomTypography>
                            <CustomTypography>{order.shippingFee}</CustomTypography>
                            <CustomTypography>Tình trạng: </CustomTypography>
                            <CustomTypography>{order.status}</CustomTypography>
                        </Box>
                    </DialogContent>
                )}
            </Dialog>
        </React.Fragment>
    );
}
