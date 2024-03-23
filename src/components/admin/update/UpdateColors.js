import { Breadcrumbs, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosJWT from '../../../api/ConfigAxiosInterceptor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateColors = () => {
  const { id } = useParams()
  const [data, setData] = useState()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const navigate = useNavigate()
  const handleSubmit = () => {
    axiosJWT.put(`https://kietpt.vn/api/color/${id}`, formData)
      .then(res => {
        navigate('/admin/colors')
        toast.success("Update successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while update the color.");
        }
        console.log(error);
      });
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/color/${id}`).then(res => setFormData(res?.data?.data))
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
        <Typography sx={{ fontSize: "20px" }}>Colors</Typography>
      </Breadcrumbs>
      <Typography variant='h5' fontWeight={700} sx={{pt:2}}>Update Color</Typography>
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
        <label>Name:</label>
        <TextField name='name' onChange={handleChange} value={formData.name} />
        <label>Description:</label>
        <TextField name='description' onChange={handleChange} value={formData.description} />
        <div>
          <Button variant='contained' onClick={() => handleSubmit()}>Submit</Button>
        </div>

      </Box>
    </div>
  )
}

export default UpdateColors