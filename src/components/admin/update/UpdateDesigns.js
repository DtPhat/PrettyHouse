import {
  Breadcrumbs,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import axiosJWT from "../../../api/ConfigAxiosInterceptor";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateDesigns = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [classifications, setClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [selectedFurnitures, setSelectedFurnitures] = useState([]);
  // const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    designName: "",
    description: "",
    designURL: "",
    designCard: {
      title: "",
      description: "",
      imgURL: "",
    },
    designPrice: 0,
    classifications: [""],
    type: "DEFAULT",
    customBy: "",
    furnitures: [""],
  });

  const fetchData = () => {
    Promise.all([
      axiosJWT.get("https://kietpt.vn/api/classification?type=room"),
      axiosJWT.get("https://kietpt.vn/api/classification?type=style"),
      axiosJWT.get(
        `https://kietpt.vn/api/furniture/ad?all=1&classificationId=${selectedClassification.join(
          ","
        )}`
      ),
      axiosJWT.get("https://kietpt.vn/api/client"),
    ])
      .then(([roomData, styleData, furnitureData, clientData]) => {
        setClassifications([roomData.data, styleData.data]);
        setFurnitures(furnitureData.data.data.furnitures);
        // setClients(clientData.data.data.clients);
        // console.log(clients);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData(
      setClassifications,
      setFurnitures,
      // setClients,
      selectedClassification,
      selectedFurnitures
    );
    console.log(selectedClassification);
  }, [selectedClassification, selectedFurnitures]);

  const classificationOptions = classifications.flatMap((dataSet) =>
    dataSet.data.map((classification) => (
      <MenuItem key={classification._id} value={classification._id}>
        {classification.classificationName}
      </MenuItem>
    ))
  );
  const furnitureOptions = furnitures.map((furniture) => (
    <MenuItem key={furniture._id} value={furniture._id}>
      {furniture.name} ({furniture.type})
    </MenuItem>
  ));

  // const clientOptions = clients
  //   .filter((client) => client.accountId.role === "CLIENT")
  //   .map((client) => (
  //     <MenuItem key={client._id} value={client._id}>
  //       {client.firstName} {client.lastName}
  //     </MenuItem>
  //   ));

    const handleSubmit = () => {
      axiosJWT
        .put(`https://kietpt.vn/api/design/${id}`, formData)
        .then((res) => {
          toast.success("Update successfully");
          setTimeout(navigate("/admin/designs"), 1000)
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.messageError) {
            toast.error(error.response.data.messageError);
          } else {
            toast.error("An error occurred while update the design.");
          }
          console.log(error.response.data.messageError);
        });
    };


  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = Array.isArray(value) ? value : [value];
    if (name === "type") {
      const customByValue = value === "DEFAULT" ? "" : formData.customBy;
      fetchData();
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        customBy: customByValue,
      }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else if (name === "classifications") {
      setSelectedClassification(newValue);
      console.log(newValue);
      fetchData();
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    } else if (name === "furnitures") {
      setSelectedFurnitures(newValue);
      console.log(newValue);
      fetchData();
      setFormData((prevData) => ({ ...prevData, [name]: newValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  useEffect(() => {
    axiosJWT
      .get(`https://kietpt.vn/api/design/ad/${id}`)
      .then((res) => setFormData({...res?.data?.data, classifications: res?.data?.data.classifications.map(item => item._id ) ,furnitures: res?.data?.data.furnitures.map(item => item._id ) }));
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
          to="/admin/designs"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Designs
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Update</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={700} sx={{ pt: 2 }}>
        Update design
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          pt: 2,
          width: "40rem",
        }}
        autoComplete="off"
      >
        <TextField
          name="designName"
          label="Name"
          onChange={handleChange}
          value={formData.designName}
        />
        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          value={formData.description}
        />
        <TextField
          name="designURL"
          label="Image URL"
          onChange={handleChange}
          value={formData.designURL}
        />
        <TextField
          name="designCard.title"
          label="Design Card Title"
          onChange={handleChange}
          value={formData.designCard.title}
        />
        <TextField
          name="designCard.description"
          label="Design Card Description"
          onChange={handleChange}
          value={formData.designCard.description}
        />
        <TextField
          name="designCard.imgURL"
          label="Design Card Image URL"
          onChange={handleChange}
          value={formData.designCard.imgURL}
        />
        <TextField
          type="number"
          name="designPrice"
          label="Design Price"
          onChange={handleChange}
          value={formData.designPrice}
        />
        <label>Classifications (choose 1 room and 1 style)</label>
        <Select
          multiple
          value={formData.classifications}
          onChange={handleChange}
          inputProps={{
            id: "select-multiple-classifications",
          }}
          name="classifications"
        >
          {classificationOptions}
        </Select>
        {/* <Select
          name="type"
          value={formData.type}
          label="Type"
          onChange={handleChange}
        >
          <MenuItem value="DEFAULT">DEFAULT</MenuItem>
          <MenuItem value="CUSTOM">CUSTOM</MenuItem>
        </Select>
        {formData.type === "CUSTOM" && (
          <Select
            value={formData.customBy}
            onChange={handleChange}
            name="customBy"
          >
            {clientOptions}
          </Select>
        )} */}

        <label>Furniture (choose many, max: 3)</label>
        <Select
          multiple
          value={formData.furnitures}
          onChange={handleChange}
          inputProps={{
            id: "select-multiple-furniture",
          }}
          name="furnitures"
        >
          {furnitureOptions}
        </Select>
        <div>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default UpdateDesigns;
