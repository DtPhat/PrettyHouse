import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    Breadcrumbs,
    Button,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axiosJWT from "../../../api/ConfigAxiosInterceptor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RefundOrderDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axiosJWT.get(
                `https://kietpt.vn/api/refund/${id}`
            );
            setData(response.data?.data);
        } catch (error) {
            console.error("Error fetching contract data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${day}-${month}-${year}`;
    };

    return (
        <div>
            <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
                <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin/orders"
                    style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
                >
                    Refund Orders
                </Link>
                <Typography sx={{ fontSize: "20px" }}>Detail</Typography>
            </Breadcrumbs>

            <Link to="/admin/orders">
                <Button style={{
                    marginRight: '10px',
                    backgroundColor: 'black',
                    color: 'white',
                    borderColor:'black',
                }} type="button" class="btn btn-primary">Back</Button>
            </Link>
            {data && (
                <Box
                    sx={{
                        py: 2,
                        width: "100%",
                        maxWidth: 500,
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        padding: "16px",
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", marginBottom: "16px" }}
                    >
                        Order's Refund Details
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Client:</strong> {data.clientId.firstName}{" "}
                        {data.clientId.lastName}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Total Price:</strong> {data.vnp_Amount} VND
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>PayDate:</strong> {formatDate(data.vnp_PayDate)}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Order Info:</strong> {data.vnp_OrderInfo}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Bank:</strong> {data.vnp_BankCode}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>No:</strong> {data.vnp_TransactionNo}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Type:</strong> {data.vnp_TransactionType}
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                        <strong>Status:</strong> {data.vnp_TransactionStatus}
                    </Typography>
                </Box>
            )}

        </div>
    );
};

export default RefundOrderDetail;
