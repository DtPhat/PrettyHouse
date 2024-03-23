import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import axiosJWT from "../../../api/ConfigAxiosInterceptor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateContracts = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(
        `https://kietpt.vn/api/contract/${id}`
      );
      setData(response.data?.data);
    } catch (error) {
      console.error("Error fetching contract data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (action) => {
    setSelectedAction(action);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmAction = () => {
    if (selectedAction === "SUCCESS" || selectedAction === "CANCEL") {
      handleStatusUpdate(selectedAction);
      setOpen(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await axiosJWT.put(`https://kietpt.vn/api/contract/${id}`, {
        status: newStatus,
      });
      toast.success(`Contract status updated to ${newStatus}`);
      setTimeout(navigate("/admin/contracts"), 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.messageError
      ) {
        toast.error(error.response.data.messageError);
      } else {
        toast.error("An error occurred while updating the contract.");
      }
      console.error("Error updating contract status:", error);
    }
  };

  const formatDate = (date) => {
    const dateComponents = date.split(" ")[0].split("/");
    const day = dateComponents[0];
    const month = dateComponents[1];
    const year = dateComponents[2];
    return `${day}/${month}/${year}`;
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
          to="/admin/contracts"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Contracts
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Update</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={700} sx={{ pt: 2 }}>
        Contract Confirmation
      </Typography>
      {data && (
        <Box
          sx={{
            py: 2,
            width: "100%",
            maxWidth: 400,
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
            Contract Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Client:</strong> {data.client.firstName}{" "}
            {data.client.lastName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Total Contract Price:</strong> {data.contractPrice} VND
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Date:</strong> {formatDate(data.date)}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Status:</strong> {data.status}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>Furnitures:</strong>
          </Typography>
          {data?.furnitures?.map((furniture, index) => (
            <Box key={index} sx={{ paddingLeft: "16px" }}>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Name:</strong> {furniture.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Quantity:</strong> {furniture.quantity}
              </Typography>
            </Box>
          ))}
          <Typography
            variant="body1"
            sx={{ marginBottom: "8px", marginTop: "16px" }}
          >
            <strong>Designs:</strong>
          </Typography>
          {data?.designs?.map((design, designIndex) => (
            <Box key={designIndex} sx={{ paddingLeft: "16px" }}>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Name:</strong> {design.designName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Quantity:</strong> {design.quantity}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                <strong>Furniture included:</strong>
              </Typography>
              {design.furnitures?.map((furniture, furnitureIndex) => (
                <Typography
                  key={furnitureIndex}
                  variant="body1"
                  sx={{ marginBottom: "8px", paddingLeft: "16px" }}
                >
                  {furniture.name}
                </Typography>
              ))}
            </Box>
          ))}
          <Box sx={{ marginTop: "16px" }}>
            {data?.status === "CANCEL" || data?.status === "SUCCESS" ? (
              <Typography variant="body1">
                <strong>Contract cannot be edited.</strong>
              </Typography>
            ) : (
              <>
                <Typography>
                  <strong>Confirm: </strong>
                </Typography>
                {data?.status !== "UNPAID" && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenDialog("SUCCESS")}
                      sx={{ marginRight: "8px" }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog("CANCEL")}
                    >
                      Deny
                    </Button>
                  </>
                )}
                {data?.status == "UNPAID" && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleOpenDialog("CANCEL")}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Contract Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {selectedAction === "SUCCESS" ? "accept" : "deny"} this contract?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleConfirmAction}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateContracts;
