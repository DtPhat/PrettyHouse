import { Breadcrumbs, Pagination, Typography,IconButton } from '@mui/material';
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
import EditIcon from "@mui/icons-material/Edit";


const ClientsManagement = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate()

  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/client?page=${currentPage}`).then(res => {
      setData(res?.data?.data)
    }).catch((error) => console.log(error))
  }, [currentPage]);
  console.log(data)
  return (
    <div>
      <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
        <Link
          to="/admin"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Dashboard
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Clients</Typography>
      </Breadcrumbs>
      {
        !data
          ? <Loader />
          : <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Avatar</TableCell> */}
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    {/* <TableCell>First name</TableCell>
                    <TableCell>Last name  </TableCell> */}
                    <TableCell>Client Name</TableCell>
                    <TableCell>Birthday  </TableCell>
                    <TableCell>Phone  </TableCell>
                    <TableCell>Contract  </TableCell>
                    <TableCell>Action</TableCell>
                    {/* <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.clients?.map((row) => (
                    
                    <TableRow
                      key={row.email}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {/* <TableCell><img src={row.photoUrl} /></TableCell> */}
                      <TableCell>{row.accountId.email}</TableCell>
                      {/* <TableCell>{row.accountId._id}</TableCell> */}
                      <TableCell>{row.accountId.role}</TableCell>
                      <TableCell>{row.accountId.status}</TableCell>
                      {/* <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell> */}
                     
                      <TableCell> {row.firstName}{" "}{row.lastName}</TableCell>
                      <TableCell>{row.birthDate}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.contracts.length}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => { navigate(`${row.accountId._id}`) }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      {/* <TableCell>
                        <IconButton onClick={() => { navigate( `/admin/clients/${row._id}`) }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell> */}
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

export default ClientsManagement