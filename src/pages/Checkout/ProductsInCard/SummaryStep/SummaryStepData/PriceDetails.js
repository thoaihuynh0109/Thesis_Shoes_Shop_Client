import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    styled,
} from '@mui/material';

const CustomTypographyPriceDetails = styled(Typography)(({ fontSize }) => ({
    fontSize: fontSize || '16px',
}));
// TableCell

const CustomTableCellPriceDetails = styled(TableCell)(({ fontSize }) => ({
    fontSize: fontSize || '16px',
}));

export function TestLastRows() {
    return (
        <Box sx={{ mt: 2, border: '1px solid #757575', borderRadius: '5px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableBody align="right">
                        <TableRow>
                            <CustomTableCellPriceDetails rowSpan={4} />
                            <CustomTableCellPriceDetails colSpan={2}>
                                Subtotal
                            </CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    1.000.000
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                        <TableRow>
                            <CustomTableCellPriceDetails>Tax</CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right"></CustomTableCellPriceDetails>

                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    10%
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                        <TableRow>
                            <CustomTableCellPriceDetails colSpan={2}>
                                Total
                            </CustomTableCellPriceDetails>
                            <CustomTableCellPriceDetails align="right">
                                <CustomTypographyPriceDetails
                                    sx={{
                                        width: '300px',
                                        pr: '99px',
                                        display: 'inline-block',
                                    }}
                                >
                                    123
                                </CustomTypographyPriceDetails>
                            </CustomTableCellPriceDetails>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
