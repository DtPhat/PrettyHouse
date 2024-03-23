import { Breadcrumbs, Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../../api/ConfigAxiosInterceptor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMaterials = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const navigate = useNavigate()
  const handleSubmit = () => {
    axiosJWT.post(`https://kietpt.vn/api/material`, formData)
      .then(res => {
        navigate('/admin/materials')
        toast.success("Add materials successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while creating the materials.");
        }
        console.log(error);
      });
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevData => ({ ...prevData, [name]: value }));
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
          to="/admin"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Materials
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Create</Typography>
      </Breadcrumbs>
      <Typography variant='h5' fontWeight={700} sx={{pt:2}}>Create new materials</Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pt: 2,
          width: '40rem'
        }}
        autoComplete="off"
      >
        <TextField name='name' label="Name" onChange={handleChange} />
        <TextField name='description' label="Description" onChange={handleChange} />
        <div>
          <Button variant='contained' onClick={() => handleSubmit()}>Submit</Button>
        </div>

      </Box>
    </div>
  )
}

export default CreateMaterials