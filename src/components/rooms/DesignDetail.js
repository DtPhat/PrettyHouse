import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { convertTitleToSlug } from "../../utils";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import { addDesignToCart, addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const DesignDetail = () => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
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
  const designId = state?.designId;
  const fetchData = async () => {
    try {
      const response = await axiosJWT.get(`https://kietpt.vn/api/design/${designId}`);
      const data = await response.data;
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };
  const navigate = useNavigate()
  useEffect(() => {
    fetchData()
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, []);

  const handleAddDesignToCart = () => {
    toast.info("Shopping cart was updated!", {
      position: "bottom-right"
    });
    dispatch(addDesignToCart({
      product: data,
      quantity: 1
    }))
  }
  console.log(data)

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography sx={{ color: "black", fontSize: "200" }}>
          Oops. Something wrong
        </Typography>
      </Box>
    );
  }

  if (!data) {
    window.scrollTo(0, 0);
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: "100vw",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress color="inherit" size={80} />
      </Box>
    );
  }

  const {
    designName,
    description,
    designPrice,
    designURL,
    designCard,
    furnitures,
  } = data;

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "30px",
          paddingBottom: "20px",
        }}
      >
        {designName}
      </Typography>
      <Typography sx={{ textAlign: "center", fontSize: "20px" }}>
        {description}
      </Typography>
      <div
        style={{
          backgroundImage: `url(${designURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "30rem",
        }}
      ></div>
      <Grid container spacing={2} sx={{ margin: "50px 0" }}>
        <Grid xs={8}>
          <img
            src={designCard.imgURL}
            alt="img"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid xs={4}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "30px",
              paddingBottom: "20px",
              paddingLeft: "25px"
            }}
          >
            {designCard.title}
          </Typography>
          <Typography sx={{ textAlign: "justify", fontSize: "20px", paddingLeft: "25px" }}>
            {designCard.description}
          </Typography>
        </Grid>
      </Grid>

      <Button
        sx={{
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          fontSize: "20px",
          border: "1px solid black",
          padding: "10px 20px",
          "&:hover": {
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",
            transition: "box-shadow 0.3s ease-in-out",
          },
          display: 'flex',
          gap: 2
        }}
        onClick={handleAddDesignToCart}
      >
        <Typography sx={{ textAlign: "center" }}>
          {" "}
          Price : {designPrice} VND
        </Typography>
        <Typography sx={{ textAlign: "center", fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '6px' }}>
          Add design to cart
        </Typography>
      </Button>

      <Typography
        sx={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: "30px",
          paddingBottom: "20px",
        }}
      >
        Products included in design
      </Typography>
      <Grid container spacing={2} sx={{ margin: "20px 0" }}>
        {furnitures.map((furniture) => (
          <Grid
            item
            key={furniture._id}
            xs={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Card
              sx={{
                flexGrow: 1,
                height: "fit-content",
                border: "1px solid black",
              }}
            >
              <CardMedia
                sx={{ objectFit: "cover", height: "360px" }}
                image={furniture.imgURL[0]}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" noWrap>
                  {furniture.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {furniture.price} VND
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  padding: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  style={{ backgroundColor: "black" }}
                  variant="contained"
                  size="small"
                  onClick={() => handleAddToCart(furniture)}
                >
                  Add to cart
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    border: "1px solid black",
                    color: "black",
                  }}
                  size="small"
                  onClick={() => navigate(`/furnitures/${convertTitleToSlug(furniture.name)}`, { state: { furnitureId: furniture._id } })}
                >
                  View Detail
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default DesignDetail;
