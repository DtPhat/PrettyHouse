import React, { useEffect, useState } from "react";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import Loader from "../loader/Loader";
import {
  Box,
  Breadcrumbs,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { capTextWithEllipsis } from "../../utils";
import AddIcon from "@mui/icons-material/Add";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DesignsManagement = () => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const navigate = useNavigate();

  const hanldeDelete = () => {
    axiosJWT
      .delete(`https://kietpt.vn/api/design/${deleteId}`)
      .then((res) => {
        handleClose();
        setData(prevData => ({ ...prevData, designs: prevData.designs.filter(design => design._id != deleteId) }))
        toast.success("Deleted successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while delete the design.");
        }
        console.log(error);
      });
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    axiosJWT
      .get(`https://kietpt.vn/api/design/ad?page=${currentPage}&classificationId=`)
      .then((res) => {
        setData(res?.data?.data);
      });
  }, [currentPage]);
  // console.log(data);

  return (
    <div>
      <Breadcrumbs separator=">" sx={{ paddingTop: "20px" }}>
        <Link
          to="/admin"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Dashboard
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Designs</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("create")}
        >
          Add new
        </Button>
      </Box>
      {!data ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2}>
            {data.designs?.map((design) => (
              <Grid
                item
                key={design._id}
                xs={12}
                md={6}
                lg={4}
                xl={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Card
                  sx={{
                    flexGrow: 1,
                    height: "fit-content",
                    border: "1px solid black",
                  }}
                >
                  <CardMedia
                    sx={{ objectFit: "cover", height: "14rem" }}
                    image={design.designURL}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {design.designName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {capTextWithEllipsis(design.description, 50)}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      Type: {design.type}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Classification: {design.classifications.join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      diplay: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleClickOpen(design._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        navigate(`${design._id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
              <Button
                color="error"
                variant="contained"
                onClick={hanldeDelete}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
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

export default DesignsManagement;