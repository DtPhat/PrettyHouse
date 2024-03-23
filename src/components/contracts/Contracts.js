import { Box, Button, CardContent, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Pagination, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import Loader from '../loader/Loader';
import { Card } from 'react-bootstrap';
import { convertTitleToSlug } from '../../utils';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Contracts = () => {
  const [data, setData] = useState()
  const [openCancel, setOpenCancel] = useState(false);
  const [openRefund, setOpenRefund] = useState(false);
  const [deletePayload, setDeletePayload] = useState()
  const [selectedContract, setSelectedContract] = useState()
  const [refetch, setRefetch] = useState(false)
  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/contract/client`).then((res) => {
      setData(res.data?.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [refetch]);
  const handleClose = () => {
    setOpenCancel(false);
    setOpenRefund(false);
  };
  const hanldeOpenRefund = (payload) => {
    setOpenRefund(true)
    setDeletePayload(payload)
  }

  const hanldeOpenCancel = (payload) => {
    setOpenCancel(true)
    setSelectedContract(payload)
  }
  const navigate = useNavigate()

  const requestRefund = () => {
    axiosJWT.post(`https://kietpt.vn/api/request`, deletePayload)
      .then(res => {
        toast.info("Refund successful. Waiting for processing!")
        setRefetch(prevState => !prevState)
      })
      .catch(error => { console.log(error); toast.error(error.response.data.messageError) })
      .finally(() => {
        handleClose()
      })
  }

  const cancelContract = () => {
    axiosJWT.put(`https://kietpt.vn/api/contract/${selectedContract}`, {
      status: "CANCEL"
    }).then(res => {
      toast.success("Cancel successful!")
      setRefetch(prevState => !prevState)
    })
      .catch(error => { console.log(error); toast.error(error.messageError) })
      .finally(() => {
        handleClose()
      })
  }

  console.log(data)



  return (
    <Container sx={{ my: 2 }}>
      <Typography variant='h4' >Contract history</Typography>
      <Typography variant='subtitle2' >Check status your contracts and request for refund</Typography>
      <Link to={'refunds'} style={{ color: "darkblue" }}>My refund history</Link>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {
          !data
            ? <Loader />
            : data.map(item =>
              <Paper sx={{ p: 2 }}>
                {/* <Box sx={{ display: 'flex', gap: 4, justifyContent: "space-between" }}> */}
                <Grid container sx={{ display: 'flex', gap: 4, justifyContent: "space-between" }}>
                  <Grid item sx={'auto'}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Contract Id</Typography>
                    <Typography>{item._id}</Typography>
                  </Grid>
                  <Grid item sx={'auto'}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Price</Typography>
                    <Typography>{item.contractPrice} VND</Typography>
                  </Grid>
                  <Grid item sx={'auto'}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Status</Typography>
                    <Typography>{item.status}</Typography>
                  </Grid>
                  <Grid item sx={'auto'}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Created At</Typography>
                    <Typography>{item.date}</Typography>
                  </Grid>
                  <Grid item sx={'auto'}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Action</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {
                        item.status == "UNPAID"
                          ? <Button variant='contained' color='warning' disabled={item.status !== "UNPAID"}
                            onClick={() => hanldeOpenCancel(item._id)}>
                            Cancel
                          </Button>
                          : <Button variant='contained' color='error' disabled={item.status !== "PROCESSING"}
                            onClick={() => hanldeOpenRefund({ clientId: item.client.clientId, contractId: item._id })}>
                            Refund
                          </Button>
                      }
                    </Box>
                  </Grid>
                </Grid>
                {item.furnitures?.length
                  ? <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Furnitures:</Typography>
                    <ul>
                      {item.furnitures.map(furniture =>
                        <li style={{ display: "flex", gap: 4 }}>
                          - <Typography gutterBottom noWrap variant="subtitle1" sx={{ '&:hover': { cursor: 'pointer', color: "darkblue" } }}
                            onClick={() => { navigate(`/furnitures/${convertTitleToSlug(furniture.name)}`, { state: { furnitureId: furniture._id } }) }}
                          >
                            {furniture.name}
                          </Typography>
                          X
                          <Typography gutterBottom noWrap variant="subtitle1"
                          >
                            {furniture.quantity}
                          </Typography>
                        </li>
                      )}
                    </ul>
                  </Paper>
                  : null}
                {item.designs?.length
                  ? <Paper sx={{ mt: 2, p: 2 }}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }}>Designs:</Typography>
                    <ul>
                      {item.designs.map(design =>
                        <li style={{ display: "flex", gap: 4 }}>
                          - <Typography gutterBottom noWrap variant="subtitle1" sx={{ '&:hover': { cursor: 'pointer', color: "darkblue" } }}
                            onClick={() => { navigate(`/designs/${convertTitleToSlug(design.designName)}`, { state: { designId: design.designId } }) }}
                          >
                            {design.designName}
                          </Typography>
                          X
                          <Typography gutterBottom noWrap variant="subtitle1"
                          >
                            {design.quantity}
                          </Typography>
                        </li>
                      )}
                    </ul>
                  </Paper>
                  : null}
              </Paper>
            )
        }

      </Stack>
      <Dialog
        open={openRefund}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Refund this contract?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action needs admin approval
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' variant='contained' onClick={requestRefund} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openCancel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title-2">
          {"Cancel this contract?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action needs admin approval
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' variant='contained' onClick={cancelContract} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container >

  )
}

export default Contracts