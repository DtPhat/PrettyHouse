import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import React from 'react';
const ProductCard = () => {
  return (
    <div><Card sx={{ maxWidth: "500px" }}>
      <CardMedia
        sx={{ objectFit: "cover", height: "16rem" }}
        image="https://product.hstatic.net/1000078439/product/1-min_optimized_3807133cc9c44677a208c268a9cbf889.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Leverett 1.2M Dining Table
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a dinner table
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: "18px", display: "flex", justifyContent: "space-between"}}>
        <Button
        style={{backgroundColor: "black"}}
          variant="contained"
          size="small"
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
        >
          View Detail
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}

export default ProductCard