import { Box, Breadcrumbs, CardActionArea, CardActions, Container, Grid, Pagination, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosJWT from '../../api/ConfigAxiosInterceptor';
import { convertTitleToSlug } from '../../utils';
import Loader from '../loader/Loader';
import { addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const Shop = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = React.useState('ASC');
  const navigate = useNavigate()
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const handleAddToCart = (furniture) => {
    toast.info("Shopping cart was updated!", {
      position: "bottom-right"
    });
    dispatch(addToCart({
      product: furniture,
      quantity: 1
    }))
  }

  useEffect(() => {
    axiosJWT.get(`https://kietpt.vn/api/furniture?page=${currentPage}&sort_by=${sortBy}&type=DEFAULT`).then(res => {
      setData(res?.data?.data)
    })
  }, [currentPage, sortBy]);
  console.log(data)
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://www.ikea.com/images/link-to-comfortable-cozy-ideas-for-small-living-rooms-image--7047a33a658ae7a6174d994cd54af7dd.jpg?f=xxxl",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "24rem",
        }}
      >
        <section
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            float: "right",
            height: "100%",
            padding: "3rem",
          }}
        >
          <h3>Shop</h3>
          <Breadcrumbs
            separator="/"
            sx={{
              color: "white",
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "500",
              }}
            >
              Home
            </Link>
            <Typography sx={{ fontWeight: "600" }}>Shop</Typography>
          </Breadcrumbs>
        </section>
      </div>
      <Container sx={{ py: 2 }}>
        <Box sx={{ py: 2 }}>
          <FormControl sx={{ width: "14rem" }}>
            <InputLabel id="demo-simple-select-label">Sort by price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort by price"
              onChange={handleChange}
            >
              <MenuItem value={'ASC'}>high to low</MenuItem>
              <MenuItem value={'DESC'}>low to high</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {
          !data
            ? <Loader />
            : <>
              <Grid container spacing={2} >
                {
                  data.furnitures?.map(furniture =>
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                      item
                      key={furniture._id}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Card>
                        <CardActionArea>
                          {/* <CardMedia
                        component="img"
                        height="140"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2wZs5QsnOCuyclQPvNJibUs25RK-OQNTwqN87PmJuWQ&s"
                        alt="green iguana"
                      /> */}
                          <CardMedia>

                            <Carousel style={{ background: 'black' }}>
                              {
                                furniture.imgURL?.map(img =>
                                  <Carousel.Item>
                                    <img src={img} style={{ width: '100%', height: "16rem", objectFit: 'fill', }} />
                                  </Carousel.Item>
                                )
                              }
                            </Carousel>
                          </CardMedia>
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div" noWrap>
                              {furniture.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" align='right'>
                              {furniture.price} VND
                            </Typography>
                          </CardContent>
                          <CardActions style={{ display: "flex", justifyContent: 'space-between', width: "100%", textDecoration: 'inherit' }}>
                              <Button variant="dark" onClick={() => { navigate(`/furnitures/${convertTitleToSlug(furniture.name)}`, { state: { furnitureId: furniture._id } }) }}>
                                View details
                              </Button>
                            <Button variant="outline-dark" onClick={() => handleAddToCart(furniture)}>
                              Add to cart
                            </Button>
                          </CardActions>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  )}
              </Grid>
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
        }
      </Container >
    </>

  )
}

export default Shop