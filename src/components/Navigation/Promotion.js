import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Promotion = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              src="https://assets.pbimgs.com/pbimgs/ab/images/dp/ecm/202350/1943/001/009.jpg"
              style={{ backgroundSize: "cover", maxWidth: "400px" }}
            />
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ mt: 2, mb: 8 }}
            >
              <Link
                to="/signin"
                style={{ textDecoration: "none" }}
                onClick={() => window.scrollTo(0, 0)}
              >
                Join to get these valueable deals
              </Link>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              UNLIMITED PURCHASES - 0% INTEREST INSTALLMENTS
            </Typography>
            <Typography variant="body1" gutterBottom>
              Are you ready to elevate your home with exquisite furniture
              without worrying about upfront costs? We're excited to introduce
              our exclusive program: "UNLIMITED PURCHASES - 0% INTEREST
              INSTALLMENTS" available for all orders.
              <br />
              <br /> This revolutionary program empowers you to furnish your
              space with premium quality furniture while managing your finances
              smartly. Instead of bearing the burden of paying the entire order
              amount upfront, you can opt for hassle-free 0% interest
              installments spread over convenient periods of 3, 6, or 9 months.
              <br />
              <br /> It's never been easier to bring luxury and comfort into
              your home with our seamless payment solution. Experience the joy
              of shopping without financial constraints and transform your
              living spaces effortlessly.
              <br />
              <br />
              Take advantage of this opportunity and embark on your journey
              towards a beautifully curated home today!
            </Typography>
            <br />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Promotion;
