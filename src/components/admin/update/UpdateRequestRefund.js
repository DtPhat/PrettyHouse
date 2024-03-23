import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosJWT from "../../../api/ConfigAxiosInterceptor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRequestRefund = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("ACCEPT");
  const [data, setData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    submitRequest();
  };

  const submitRequest = () => {
    axiosJWT
      .put(`https://kietpt.vn/api/request/${id}`, { status })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(navigate("/admin/refunds"), 1000);
        console.log("put", res);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.messageError
        ) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while updating the request.");
        }
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    axiosJWT
      .get(`https://kietpt.vn/api/request/${id}`)
      .then((res) => {
        setStatus(res.data?.data?.status);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
          to="/admin/refunds"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Request Refund
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Update</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={700} sx={{ pt: 2 }}>
        Update request
      </Typography>
      <Box
        sx={{
          py: 2,
          width: "12rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={loading ? "" : status}
            label="Status"
            onChange={handleChange}
            disabled={loading}
          >
            <MenuItem value={"ACCEPT"}>ACCEPT</MenuItem>
            <MenuItem value={"DENY"}>DENY</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Box>
      {/* Dialog for confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <Typography id="dialog-description">
            Do you want to "{status === "ACCEPT" ? "Accept" : "Deny"}" the
            request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmSubmit}
            color="info"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateRequestRefund;
