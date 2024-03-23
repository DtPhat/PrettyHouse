import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumbs, IconButton, Pagination, Typography } from "@mui/material";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import Loader from "../loader/Loader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InfoIcon from '@mui/icons-material/Info';

export default function Component() {
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        axiosJWT
            .get(`https://kietpt.vn/api/refund/`)
            .then((res) => {
                setData(res?.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setData([]);
            });
    }, [currentPage]);
    console.log("du lieu request", data);
    return (
        <div>
            <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
                <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
                >
                    Dashboard
                </Link>
                <Typography sx={{ fontSize: "20px" }}>Refund Orders</Typography>
            </Breadcrumbs>

            {!data ? (
                <Loader />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ClientName</TableCell>
                                <TableCell align="left">Refund</TableCell>
                                <TableCell align="left">PayDate</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.clientId.firstName}{" "}{row.clientId.lastName}
                                    </TableCell>
                                    <TableCell align="left">{row.vnp_Amount} VND</TableCell>
                                    <TableCell align="left">{formatDate(row.vnp_PayDate)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => { navigate(`${row._id}`) }}>
                                            <InfoIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}
