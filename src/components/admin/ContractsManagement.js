import { Breadcrumbs, IconButton, Pagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Edit from "@mui/icons-material/Edit";
import BlockIcon from '@mui/icons-material/Block';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContractsManagement = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();

  useEffect(() => {
    axiosJWT
      .get(`https://kietpt.vn/api/contract?page=${currentPage}`)
      .then((res) => {
        setData(res?.data?.data);
      });
  }, [currentPage]);
  console.log(data);
  return (
    <div>
      <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
        <Link
          to="/admin"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Dashboard
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Contracts</Typography>
      </Breadcrumbs>
      {!data ? (
        <Loader />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Contract ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Price </TableCell>
                  <TableCell>Status </TableCell>
                  <TableCell align="center">Action </TableCell>
                  {/* <TableCell>Action</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.client.firstName}{" "}{row.client.lastName}</TableCell>
                    <TableCell>{row.contractPrice} VND</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="center">
                      {row.status === "CANCEL" || row.status === "SUCCESS" ? (
                        <BlockIcon />
                        ) : (
                        <IconButton
                          onClick={() => {
                            navigate(`${row._id}`);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={data.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ContractsManagement;
