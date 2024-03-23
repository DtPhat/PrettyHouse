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

const CreateFurnitures = () => {
  const [materials, setMaterials] = useState()
  const [colors, setColors] = useState()
  const [delivery, setDelivery] = useState()
  console.log(delivery)
  const [productClassification, setProductClassification] = useState()
  const [styleClassification, setStyleClassification] = useState()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    colors: [],
    materials: [],
    sizes: '',
    price: 0,
    returnExchangeCases: "",
    nonReturnExchangeCases: "",
    delivery: "65c90357db6eeb89cdbe26aa",
    type: "DEFAULT",
    productClassification: [],
    styleClassification: [],
  })
  console.log("Form data:", formData)
  const navigate = useNavigate()
  const handleSubmit = () => {
    const submitData = {
      name: formData.name,
      description: formData.description,
      imgURL: [formData.image1, formData.image2, formData.image3].filter(image => image.trim() !== ''),
      colors: formData.colors,
      materials: formData.materials,
      sizes: formData.sizes,
      price: formData.price,
      returnExchangeCases: formData.returnExchangeCases.split('\n'),
      nonReturnExchangeCases: formData.nonReturnExchangeCases.split('\n'),
      type: "DEFAULT",
      classifications: [
        ...formData.productClassification,
        ...formData.styleClassification,
      ],
      delivery: delivery?._id || "65c90357db6eeb89cdbe26aa",
    }
    console.log("Submit data:", submitData)
    axiosJWT.post(`https://kietpt.vn/api/furniture`, submitData)
      .then(res => {
        console.log(res)
        toast.success("Add furniture successfully");
        setTimeout(navigate('/admin/furnitures'), 1000)
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.messageError) {
          toast.error(error.response.data.messageError);
        } else {
          toast.error("An error occurred while creating the furniture.");
        }
        console.log(error);
      });
  }
  console.log(formData)
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData, [name]: value
      // (name == 'colors' || name == 'materials' || name == 'productClassification' || name == 'styleClassification')
      //   ? value : value
    }));
  };
  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/classification?type=product`).then(res => {
      setProductClassification(res?.data?.data)
    }).catch(error => {
      console.log(error)
    })
    axiosJWT.get(`https://kietpt.vn/api/classification?type=style`).then(res => {
      setStyleClassification(res?.data?.data)
    })
    axiosJWT.get(`https://kietpt.vn/api/color`).then(res => {
      setColors(res?.data?.data)
    }).catch(error => {
      console.log(error)
    })
    axiosJWT.get(`https://kietpt.vn/api/material`).then(res => {
      console.log(res)
      setMaterials(res?.data?.data)
    }).catch(error => {
      console.log(error)
    })
    axiosJWT.get(`https://kietpt.vn/api/delivery`).then(res => {
      setDelivery(res?.data?.data?.deliveries)
    }).catch(error => {
      console.log(error)
    })
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
          to="/admin/furnitures"
          style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
        >
          Furnitures
        </Link>
        <Typography sx={{ fontSize: "20px" }}>Create</Typography>
      </Breadcrumbs>
      <Typography variant='h5' fontWeight={700} sx={{ pt: 2 }}>Create Furniture</Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          pt: 2,
          width: '60rem'
        }}
        autoComplete="off"
      >
        <TextField name='name' label='Name' onChange={handleChange} value={formData.name} />
        <TextField name='description' label='Description' onChange={handleChange} value={formData.description} />
        <TextField name='image1' label={'Image 1'} onChange={handleChange} value={formData.image1} />
        <TextField name='image2' label={'Image 2'} onChange={handleChange} value={formData.image2} />
        <TextField name='image3' label={'Image 3'} onChange={handleChange} value={formData.image3} />
        <TextField name='price' label="Price" type='number' onChange={handleChange} value={formData.price} />
        <TextField name='sizes' label="Sizes" onChange={handleChange} value={formData.sizes} />
        <TextField name='returnExchangeCases' multiline rows={2} label="Return Exchange Case" onChange={handleChange} value={formData.returnExchangeCases} />
        <TextField name='nonReturnExchangeCases' multiline rows={2} label="Non Return Exchange Case" onChange={handleChange} value={formData.nonReturnExchangeCases} />
        {/* <TextField name='delivery' label="Delivery" onChange={handleChange} value={formData.sizes} /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Materials</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='materials'
            value={formData.materials}
            label="Materials"
            onChange={handleChange}
          >
            {
              materials?.map(item =>
                <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
              )
            }
          </Select>
        </FormControl>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Colors</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.colors}
            name='colors'
            label="Materials"
            onChange={handleChange}
          >
            {
              colors?.map(item =>
                <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
              )
            }
          </Select>
        </FormControl>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Product Classification</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='productClassification'
            value={formData.productClassification}
            label="Product Classification"
            onChange={handleChange}
          >
            {
              productClassification?.map(item =>
                <MenuItem value={item._id} key={item._id}>{item.classificationName}</MenuItem>
              )
            }
          </Select>
        </FormControl>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Style Classification</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name='styleClassification'
            value={formData.styleClassification}
            label="Style Classification"
            onChange={handleChange}
          >
            {
              styleClassification?.map(item =>
                <MenuItem value={item._id} key={item._id}>{item.classificationName}</MenuItem>
              )
            }
          </Select>
        </FormControl>
        <div>
          <Button variant='contained' onClick={() => handleSubmit()}>Submit</Button>
        </div>

      </Box>
    </div>
  )
}

export default CreateFurnitures