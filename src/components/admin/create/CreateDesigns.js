import {
  Breadcrumbs,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import axiosJWT from "../../../api/ConfigAxiosInterceptor";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateDesigns = () => {
  const navigate = useNavigate();
  const [classifications, setClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState([]);
  const [furnitures, setFurnitures] = useState([]);
  const [error, setError] = useState(null);
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
      // axiosJWT.get("https://kietpt.vn/api/client"),
    ])
      .then(([roomData, styleData, furnitureData]) => {
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
  //   .filter((client) => client.accountId.role === "CLIENT") // Filter clients based on role
  //   .map((client) => (
  //     <MenuItem key={client._id} value={client._id}>
  //       {client.firstName} {client.lastName}
  //     </MenuItem>
  //   ));
  const handleSubmit = () => {
    axiosJWT
      .post(`https://kietpt.vn/api/design`, formData)
      .then((res) => {
        toast.success("Add design successfully");
        setTimeout(navigate("/admin/designs"), 1000);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while creating the design.");
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
        <Typography sx={{ fontSize: "20px" }}>Create</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={700} sx={{ pt: 2 }}>
        Create new design
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
        <TextField name="designName" label="Name" onChange={handleChange} />
        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
        />
        <TextField name="designURL" label="Image URL" onChange={handleChange} />
        <TextField
          name="designCard.title"
          label="Design Card Title"
          onChange={handleChange}
        />
        <TextField
          name="designCard.description"
          label="Design Card Description"
          onChange={handleChange}
        />
        <TextField
          name="designCard.imgURL"
          label="Design Card Image URL"
          onChange={handleChange}
        />
        <TextField
          type="number"
          name="designPrice"
          label="Design Price"
          onChange={handleChange}
        />
        <label>Classifications (choose 1 room and 1 style)</label>
        <Select
          multiple
          value={selectedClassification}
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

        <label>Furniture (choose many)</label>
        <Select
          multiple
          value={selectedFurnitures}
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

export default CreateDesigns;
