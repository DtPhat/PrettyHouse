import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Breadcrumbs, Button, CardActionArea, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Pagination, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FurnituresManagement = () => {

  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState()

  const navigate = useNavigate()
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  const hanldeDelete = () => {
    axiosJWT.delete(`https://kietpt.vn/api/furniture/${deleteId}`)
      .then(res => {
        handleClose()
        setData(prevData => ({ ...prevData, furnitures: prevData.furnitures.filter(item => item._id != deleteId) }))
        toast.success("Delete successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while delete the furniture.");
        }
        console.log(error);
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
    axiosJWT.get(`https://kietpt.vn/api/furniture/ad?page=${currentPage}&sort_by=ASC&type=DEFAULT`).then(res => {
      setData(res?.data?.data)
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
        <Typography sx={{ fontSize: "20px" }}>Furnitures</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <Typography variant='h5' fontWeight={'700'}>Furnitures Management</Typography>
        <Button variant='contained' startIcon={<AddIcon />} onClick={() => navigate('create')}>
          Add new
        </Button>
      </Box>
      {
        !data
          ? <Loader />
          : <>
            <Grid container spacing={2} >
              {
                data.furnitures?.map(item =>
                  <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    item
                    key={item._id}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Card >
                      <CardActionArea>
                        {/* <CardMedia
                        component="img"
                        height="140"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wZs5QsnOCuyclQPvNJibUs25RK-OQNTwqN87PmJuWQ&s"
                        alt="green iguana"
                      /> */}
                        <CardMedia>

                          <Carousel style={{ background: 'black' }}>
                            {
                              item.imgURL?.map(img =>
                                <Carousel.Item>
                                  <img src={img} style={{ width: '100%', height: "18rem", objectFit: 'fill', }} />
                                </Carousel.Item>
                              )
                            }
                          </Carousel>
                        </CardMedia>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div" noWrap>
                            {item.name}
                          </Typography>
                          <Typography variant="h6" color="text.secondary" align='right'>
                            {item.price} VND
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ diplay: 'flex', width: '100%', justifyContent: 'end' }}>
                          <Button color='error' variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleClickOpen(item._id)}>
                            Delete
                          </Button>
                          <Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(item._id)} >
                            Edit
                          </Button>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )}
            </Grid>
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
          <Button color='error' variant='contained' onClick={hanldeDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default FurnituresManagement