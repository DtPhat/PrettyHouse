import { Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Container, Grid, IconButton, Paper, Stack, Typography, MenuItem, Select, FormControl, InputLabel, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDesignToCart, addToCart, removeDesignFromCart, removeFromCart, selectCart, selectCartAmount, selectTotalCost } from '../../redux/cart/cartSlice';
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import { convertTitleToSlug } from '../../utils';

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCart)
  const cartAmount = useSelector(selectCartAmount)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("VNBANK")
  console.log(cartItems)
  const isEmptyCart = !cartItems.furnitures.length && !cartItems.designs.length
  const totalCost = useSelector(selectTotalCost)
  const hanldeCheckout = () => {
    setLoadingCheckout(true)
    axiosJWT.post(`https://kietpt.vn/api/payment/create_payment`, {
      furnitures: cartItems.furnitures.map(item => ({
        furnitureId: item.product._id,
        quantity: item.quantity
      })),
      designs: cartItems.designs.map(item => ({
        designId: item.product._id,
        quantity: item.quantity
      })),
      amount: totalCost,
      bankCode: paymentMethod,
      language: "vn"
    }).then((res) => {
      console.log(res.data)
      toast.warn("Checkout sucessfully, moving to payment page!")
      window.location.replace(res.data?.paymentURL)
    })
      .catch(error => console.log(error))
  }
  return (
    <Container maxWidth='xl' sx={{ my: 4, minHeight: '50vh' }}>
      <Paper><Typography sx={{ p: 1, fontWeight: 600 }} variant='h4'>Shopping Cart ({cartAmount})</Typography></Paper>
      <Grid container pt={2} spacing={2}>
        <Grid item xs={8}>
          {isEmptyCart
            ? <Typography variant='h5'>You have no products in cart</Typography>
            : <Stack spacing={2}>
              {/* <Typography gutterBottom noWrap variant="h5" component="div">
                Furnitures:
              </Typography> */}
              {cartItems.furnitures.map(cartItem =>
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    sx={{ width: "10rem", height: "10rem" }}
                    image={cartItem.product.imgURL[0]}
                    title="Product image"
                  />
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box sx={{
                      display: "flex", justifyContent: "space-between",
                    }}>
                      <Typography gutterBottom noWrap variant="h5" sx={{ '&:hover': { cursor: 'pointer', color: "darkblue" } }}
                        onClick={() => { navigate(`/furnitures/${convertTitleToSlug(cartItem.product.name)}`, { state: { furnitureId: cartItem.product._id } }) }}
                      >
                        {cartItem.product.name}
                      </Typography>
                      <IconButton onClick={() => dispatch(removeFromCart(cartItem.product))}>
                        <Close fontSize='large' color='error' />
                      </IconButton>
                    </Box>
                    {/* <Typography variant="h6" color="text.secondary">
                      {cartItem.product.description}
                    </Typography> */}
                    <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: "flex", alignItems: 'center', gap: '2rem' }}>
                        <Typography variant='h4' sx={{ fontWeight: 600 }}>{(cartItem.product.price * cartItem.quantity)} VND</Typography>
                        {/* <Button size='large' variant='contained' startIcon={<ShoppingCart />} onClick={handleAddToCart}>Add to cart</Button> */}
                      </Box>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" >
                        <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                          disabled={cartItem.quantity <= 1}
                          onClick={() => {
                            // cartItem.quantity === 1 ? dispatch(removeFromCart(cartItem.product)) :
                            dispatch(addToCart({ product: cartItem.product, quantity: -1 }))
                          }}>
                          -
                        </Button>
                        <Button disableRipple
                          sx={{ fontSize: "1.2rem", ":hover": 'none', width: "4rem" }}
                          style={{
                            border: "1px solid black",
                            color: "black",
                          }} >{cartItem.quantity}</Button>
                        <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                          onClick={() => dispatch(addToCart({ product: cartItem.product, quantity: 1 }))}
                          disabled={cartItem.quantity >= 99}>
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </CardContent>
                </Card>
              )}
              <Divider sx={{ border: "1px solid black" }} />
              {cartItems.designs.map(cartItem =>
                <Paper>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography gutterBottom noWrap variant="h4" component="div">{cartItem.product.designName}</Typography>
                      <IconButton
                        onClick={() => dispatch(removeDesignFromCart(cartItem.product))}
                      >
                        <Close fontSize='large' color='error' />
                      </IconButton>
                    </Box>
                    <Box sx={{ pt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: "flex", alignItems: 'center', gap: '2rem' }}>
                        <Typography variant='h4' sx={{ fontWeight: 600 }}>{(cartItem.product.designPrice * cartItem.quantity)} VND</Typography>
                        <Typography variant='h4' sx={{ textDecoration: "line-through" }}>
                          {((cartItem.product.furnitures.reduce((total, item) => total += item.price, 0)) * cartItem.quantity)} VND
                        </Typography>
                        <Typography variant='h5'>
                          (-{(100 - (cartItem.product.designPrice / cartItem.product.furnitures.reduce((total, item) => total += item.price, 0)).toFixed(2) * 100)} %)
                        </Typography>
                      </Box>
                      <ButtonGroup variant="outlined" aria-label="outlined button group" >
                        <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                          disabled={cartItem.quantity <= 1}
                          onClick={() => dispatch(addDesignToCart({ product: cartItem.product, quantity: -1 }))}
                        >
                          -
                        </Button>
                        <Button disableRipple
                          sx={{ fontSize: "1.2rem", ":hover": 'none', width: "4rem" }}
                          style={{
                            border: "1px solid black",
                            color: "black",
                          }} >
                          {cartItem.quantity}
                        </Button>

                        <Button variant='contained' sx={{ fontSize: '1.2rem', fontWeight: 800 }} style={{ backgroundColor: "black" }}
                          onClick={() => dispatch(addDesignToCart({ product: cartItem.product, quantity: 1 }))}
                          disabled={cartItem.quantity >= 99}>
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </CardContent>
                  <Stack spacing={2} sx={{ p: 2 }}>
                    {
                      cartItem.product.furnitures.map(furniture =>
                        <Card sx={{ display: "flex" }}>
                          <CardMedia
                            sx={{ width: "8rem", height: "8rem" }}
                            image={furniture.imgURL[0]}
                            title="Product image"
                          />
                          <CardContent sx={{ flex: "1 0 auto" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography gutterBottom noWrap variant="h5" sx={{ '&:hover': { cursor: 'pointer', color: "darkblue" } }}
                                onClick={() => { navigate(`/furnitures/${convertTitleToSlug(furniture.name)}`, { state: { furnitureId: furniture._id } }) }}
                              >
                                {furniture.name}
                              </Typography>
                              {/* <Typography gutterBottom noWrap variant="h5" component="div">Quantity: {1}</Typography> */}
                            </Box>
                            {/* <Typography variant='h5' sx={{  }}>{(furniture.price)} VND</Typography> */}
                          </CardContent>
                        </Card>
                      )
                    }
                  </Stack>

                </Paper>
              )}
            </Stack>
          }
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Card sx={{ py: 1, px: 2, display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant='h5' fontWeight={600}>Order Infomation</Typography>
              <Stack spacing={1}>
                {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant='h6' color='gray'>Total cost: </Typography>
                  <Typography variant='h6' fontWeight={600}>${totalCost}</Typography>
                </Box> */}
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                  <Typography variant='h6' color='gray'>Shipping: </Typography>
                  <Typography variant='subtitle1'>Shipping options will be updated during checkout</Typography>
                </Box>
              </Stack>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h4' fontWeight={600}>Total: </Typography>
                <Typography variant='h4' fontWeight={600}>{totalCost} VND</Typography>
              </Box>
            </Card>
            {/* <Box sx={{ display: "flex", gap: 2, border: 'none' }}>
              <Button sx={{width: "100%", border:'1px solid black', color: 'black'}} variant='outlined'>VNPAY</Button>
              <Button sx={{width: "100%", border:'1px solid black', color: 'black'}} variant='outlined'>INTCARD</Button>
            </Box> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                label="Payment method"
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <MenuItem value={'VNBANK'}>Internal Payment</MenuItem>
                <MenuItem value={'INTCARD'}>International Payment</MenuItem>
              </Select>
            </FormControl>
            <Button variant='contained' fullWidth disabled={isEmptyCart || loadingCheckout} onClick={() => hanldeCheckout()} style={{ backgroundColor: "black", color: "white" }} > {loadingCheckout ? "Processing..." : "Checkout"}</Button>
            <Button variant='outlined' fullWidth onClick={() => navigate('/shop')}
              style={{
                border: "1px solid black",
                color: "black",
              }}>Continue Shopping</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cart