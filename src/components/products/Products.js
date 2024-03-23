import { Box, Breadcrumbs, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Carousel, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PRODUCT_IDS } from '../../constants';
import './Product.scss';
import { convertSlugToTitle, convertTitleToSlug } from '../../utils';
import Loader from '../loader/Loader';
import { addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Products = () => {
  const [data, setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const { productClassification } = useParams()
  const classificationId = PRODUCT_IDS[productClassification]
  const navigate = useNavigate()
  const [sortBy, setSortBy] = React.useState('ASC');
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const dispatch = useDispatch()
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
    if (!classificationId) {
      return navigate('/')
    }
    axios.get(`https://kietpt.vn/api/furniture-category?classificationId=${classificationId}&page=${currentPage}&sort_by=${sortBy}`)
      .then(res => setData(res.data.data))
      .catch(error => { console.log(error); navigate('/') })
  }, [currentPage, productClassification, sortBy]);
  console.log(data)

  return (
    <section style={{ paddingBottom: "1rem" }}>
      <Container fluid className='background-image'>
        <Container className='upper-section'>
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
            <Typography sx={{ fontWeight: "600" }}>{convertSlugToTitle(productClassification)}</Typography>
          </Breadcrumbs>
        </Container>
      </Container>
      <Container className='filter-section' >
        <div style={{ borderBottom: '1px solid black', width: '20rem' }}>
          <Form.Select style={{ border: 'none', fontSize: '1.3rem' }} onChange={handleChange}>
            <option value="ASC">Sort by price: low to high</option>
            <option value="DESC">Sort by price: high to low</option>
          </Form.Select>
        </div>
      </Container>
      <Container  >
        {
          !data ?
            <Loader /> :
            <>
              <Grid container spacing={2} >
                {
                  data.furnitures?.map((furniture) => (
                    <Grid
                      xs={12}
                      md={6}
                      lg={4}
                      item
                      key={furniture._id}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <Card >
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
                      </Card>
                    </Grid>
                  ))
                }
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
      </Container>
    </section>

  )
}

export default Products

