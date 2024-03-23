import EditIcon from '@mui/icons-material/Edit';
import { Breadcrumbs, IconButton, Pagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountsManagement = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/account?page=${currentPage}&sort_by=asc`).then(res => {
      setData(res?.data?.data)
    })
  }, [currentPage]);
  console.log('du lioeu',data)
  return (
    <div>
      <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
        <Link
          to="/admin"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Dashboard
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Accounts</Typography>
      </Breadcrumbs>
      {
        !data
          ? <Loader />
          : <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="right">Login Method</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.accounts?.map((row) => (
                    <TableRow
                      key={row.email}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.logInMethod}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => { navigate(`${row._id}`) }}>
                          <EditIcon />
                        </IconButton>
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
      }
    </div >
  )
}

export default AccountsManagement