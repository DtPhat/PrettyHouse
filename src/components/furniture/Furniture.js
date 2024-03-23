import { Box, Breadcrumbs, Button, ButtonGroup, CardContent, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';
import Loader from '../loader/Loader';
import { convertTitleToSlug } from '../../utils';
import { addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button as BootstrapButton } from 'react-bootstrap';
const Furniture = () => {
  const { state } = useLocation()
  const [data, setData] = useState()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1)
  //Carousel
  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };
  console.log(data);
  const [value, setValue] = React.useState(0);

  //Tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch()
  const handleAddToCart = () => {
    toast.info(`${data.name} x ${quantity} was added to cart`, {
      position: "bottom-right"
    });
    dispatch(addToCart({
      product: {
        _id: data._id,
        name: data.name,
        price: data.price,
        imgURL: data.imgURL
      },
      quantity: quantity
    }))
  }

  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`https://kietpt.vn/api/furniture/${state?.furnitureId}`)
      .then(res => setData(res.data?.data))
      .catch(error => { console.log(error); navigate('/') })
  }, [state]);
  return (
    <Container sx={{ paddingBottom: "1rem" }}>
      <Breadcrumbs
        separator="/"
        sx={{
          color: "black",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: "500",
            color: "black"
          }}
        >
          Home
        </Link>
        <Link
          to={`/${data && convertTitleToSlug(data?.classifications[0]?.classificationName)}`}
          style={{
            textDecoration: "none",
            fontWeight: "500",
            color: "black"
          }}
        >
          {data?.classifications[0]?.classificationName}
        </Link>
        {/* <Typography sx={{ fontWeight: "600" }}>{data?.classifications[0]?.classificationName}</Typography> */}
      </Breadcrumbs>
      {
        !data ?
          <Loader />
          :
          <Grid container spacing={3} sx={{ pt: 2 }}>
            <Grid item sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} xs={2}>
              {
                data.imgURL?.map((img, index) => (
                  <div style={{ cursor: "pointer" }} onClick={() => handleSelect(index)} >
                    <img src={img}
                      style={{ width: '8rem', height: "8rem", objectFit: 'fill', border: currentIndex == index ? "4px solid darkBlue" : "" }} />
                  </div>
                ))
              }
            </Grid>
            <Grid item xs={5}>
              <Carousel activeIndex={currentIndex} onSelect={handleSelect} style={{ background: 'black' }}>
                {
                  data.imgURL?.map(img =>
                    <Carousel.Item>
                      <img src={img} style={{ width: '100%', height: "32rem", objectFit: 'fill', }} />
                    </Carousel.Item>
                  )
                }
              </Carousel>
            </Grid>
            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Typography variant='h5' sx={{ wordWrap: 'break-word', fontWeight: "600" }}>{data.name}</Typography>
              <Typography variant='h6' align='right'>{data.price} VND</Typography>
              <div style={{ display: 'flex', gap: "0.5rem" }}>
                <Typography variant='h6' >Material:</Typography>
                <div style={{ display: 'flex', gap: "1rem" }}>
                  {data.materials.map(material => <Typography variant='h6' sx={{ border: '1px solid grey', px: 2 }}>{material.name} </Typography>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: "0.5rem" }}>
                <Typography variant='h6' >Colors:</Typography>
                <div style={{ display: 'flex', gap: "1rem" }}>
                  {data.colors.map(color => <Typography variant='h6' sx={{ border: '1px solid grey', px: 2 }}>{color.name} </Typography>)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: "0.5rem" }}>
                <Typography variant='h6' >Size:</Typography>
                <Typography variant='h6' >{data.sizes}</Typography>
              </div>
              <div style={{ display: 'flex', gap: "0.5rem" }}>
                <Typography variant='h6' >Classification:</Typography>
                <div style={{ display: 'flex', gap: "1rem", width: '100%' }}>
                  {data.classifications.map(item => <Typography variant='subtitle1' >{item.classificationName} </Typography>)}
                </div>
              </div>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{height: '2.5rem'}} >
                  <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                    disbale={quantity <= 1}
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </Button>
                  <Button disableRipple
                    sx={{ fontSize: "1.2rem", ":hover": 'none', width: "4rem" }}
                    style={{
                      border: "1px solid black",
                      color: "black",
                    }} >{quantity}</Button>
                  <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                    disabled={quantity >= 99}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </ButtonGroup>
                <BootstrapButton onClick={handleAddToCart} style={{ height: '2.5rem' }} variant='dark'>
                  ADD TO CART
                </BootstrapButton>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='black' sx={{ fontWeight: "700" }}>
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Delivery" {...a11yProps(1)} />
                    <Tab label="Warranty" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                  {data.description}
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <div>{data.delivery.description}</div>
                  <ul>
                    <li>{data.delivery.noCharge}</li>
                    <li>{data.delivery.surcharge}</li>
                  </ul>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <div style={{ fontWeight: 700 }}>Interior Construction guarantees that the products will be warranted under the following conditions:</div>
                  <ul>
                    {
                      data.returnExchangeCases.map(item => <li>{item}</li>)
                    }
                  </ul>
                  <div style={{ fontWeight: 700 }}>The product will not be warranted if:</div>
                  <ul>
                    {
                      data.nonReturnExchangeCases.map(item => <li>{item}</li>)
                    }
                  </ul>
                </CustomTabPanel>

              </Box>
            </Grid>
          </Grid>
      }

    </Container>
  )
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default Furniture