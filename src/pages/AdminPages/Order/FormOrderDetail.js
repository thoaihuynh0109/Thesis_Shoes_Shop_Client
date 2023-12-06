import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import orderService from '~/services/orderServices';

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
                <DialogTitle>{'Order Details'}</DialogTitle>
                {order && (
                    <DialogContent sx={{ width: '600px' }}>
                        <Box>
                            <Typography>{order._id}</Typography>
                            {order.items?.length > 0 &&
                                order.items.map((item) => {
                                    return (
                                        <>
                                            <Typography>{item.name}</Typography>
                                            <Typography>{item.price}</Typography>
                                            <Typography>{item.quantity}</Typography>
                                        </>
                                    );
                                })}
                            <Typography>{order.totalAmount}</Typography>
                            <Typography>{order.paymentMethod}</Typography>
                            <Typography>{order.shippingFee}</Typography>
                            <Typography>{order.status}</Typography>
                        </Box>
                    </DialogContent>
                )}
            </Dialog>
        </React.Fragment>
    );
}
