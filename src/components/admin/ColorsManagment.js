import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Typography } from '@mui/material';
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

const ColorsManagement = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState()
  const navigate = useNavigate()
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const handleDelete = () => {
    axiosJWT.delete(`https://kietpt.vn/api/color/${deleteId}`)
      .then(res => {
        handleClose()
        setData(prevData => ({ ...prevData, data: prevData.data.filter(item => item._id != deleteId) }))
        toast.success("Delete successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while delete the color.");
        }
        console.log(error.response.data.messageError);
      });
  }

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/color/page/${currentPage}`).then(res => {
      setData(res?.data)
    })
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
        <Typography sx={{ fontSize: "20px" }}>Colors</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <Typography variant='h5' fontWeight={'700'}>Colors Management</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={() => navigate('create')}>
          Add new
        </Button>
      </Box>
      {
        !data
          ? <Loader />
          : <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.description}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleClickOpen(row._id)}>
                          <DeleteIcon />
                        </IconButton>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete the chosen item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' variant='contained' onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default ColorsManagement