import React from "react";
import {
  Breadcrumbs,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://goodhomes.wwmindia.com/content/2022/dec/drawingroomdesignbestdrawingroomdesignideaslivingroominteriordesi251671005634.jpg",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "30rem",
        }}
      >
        <section
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80%",
          }}
        >
          <Typography
            sx={{ fontWeight: "600", fontSize: "50px", textAlign: "center" }}
          >
            Return and exchange policy
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
            InteriorConstruction provides high-quality products and services.
            You will no longer be worried because InteriorConstruction is always
            willing to solve product issues during use.
          </Typography>
        </section>
        <section
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            float: "right",
            height: "20%",
            padding: "3rem",
          }}
        >
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
            <Typography sx={{ fontWeight: "600" }}>Warranty Policy</Typography>
          </Breadcrumbs>
        </section>
      </div>
      <Container style={{ paddingTop: "40px", paddingBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography
              style={{
                textAlign: "left",
                fontSize: "32px",
                fontWeight: "400",
                paddingTop: "20px",
              }}
            >
              RETURN AND EXCHANGE POLICY
            </Typography>
            <Typography>
              With the desire to ensure customers' benefits and improve service
              quality, customers can return or exchange goods for the most
              comfort and satisfaction at InteriorConstruction.
            </Typography>
            <br />
            <Typography style={{ fontSize: "30px" }} gutterBottom>
              1. Return and Exchange Cases
            </Typography>
            <List>
              <ListItem>
                <Typography>
                  - The product cannot be brought into the house (narrow stairs,
                  narrow doors, …)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  - Insufficient quantity, insufficient set as specified in the
                  order
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  - The product is defective or not substandard
                </Typography>
              </ListItem>
            </List>
            <br />
            <Typography style={{ fontSize: "30px" }} gutterBottom>
              2. Non-Return and Non-Exchange Cases
            </Typography>
            <List>
              <ListItem>
                <Typography>
                  - The products that are used, unclean, old, or damaged
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>- Insufficient invoices and vouchers</Typography>
              </ListItem>
              <ListItem>
                <Typography>- Promotional products</Typography>
              </ListItem>
            </List>
            <br />
            <Typography style={{ fontSize: "30px" }} gutterBottom>
              3. Return Procedure
            </Typography>
            <List>
              <ListItem>
                <Typography>
                  - Time allowed to exchange or return goods: Within 3 days from
                  the date of delivery, before the invoice is issued
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  - When you have a request to exchange or return goods, please
                  contact the InteriorConstruction showroom where the
                  transaction was made or via hotline: 0388415317
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  - InteriorConstruction bears the cost of exchange and return
                  services
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={5}>
            <img
              src="https://assets.pbimgs.com/pbimgs/ab/images/dp/ecm/202350/1943/001/009.jpg"
              style={{ backgroundSize: "cover", maxWidth: "600px" }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Policy;
