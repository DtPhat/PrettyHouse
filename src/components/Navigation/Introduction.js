import React from "react";
import {
  Breadcrumbs,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images.squarespace-cdn.com/content/v1/643844f97f99f9438a8475df/4f9aea7a-10b1-4d4a-9944-331c517a57ff/eikund-chairs-home.png",
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
            About Us
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "30px" }}>
            Welcome to Our Interior Construction Company
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
            <Typography sx={{ fontWeight: "600" }}>Introduction</Typography>
          </Breadcrumbs>
        </section>
      </div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          Interior Construction is a small interior e-commerce company formed in
          2024 as part of the school project for class ISC301. Originally based
          in Ho Chi Minh City, the company provides interior components to the
          clients, particularly furniture. This business plan will lay out our
          goals and tasks to make this transition successful and create enough
          market share to succeed in this highly competitive market.
        </Typography>
        <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Mission
        </Typography>
        <Typography variant="body1" gutterBottom>
          The e-commerce aims to reach revenue of $10,000 for the first three
          months, with $50,000 in total at the end of the first year. With a
          substantial amount of money, we plan to expand our team further to
          employ a larger workforce, due to the scalability of the business
          model. After the 1-year mark, we will add features of designing the
          interior of residential buildings and provide them as contracts.
        </Typography>
        <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Services
        </Typography>
        <Typography variant="body1" gutterBottom>
          Interior Construction provides services for renovating the interior
          spaces of residential structures. This includes the installation of
          interior walls, floors, ceilings, doors, windows, and furniture. In
          the future, if enough support is available, we will transition our
          current ability to include commercial buildings.
        </Typography>
        <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Market
        </Typography>
        <Typography variant="body1" gutterBottom>
          The product targets the interior market of Vietnam, particularly the
          introduction of a more modern style of interior design. Interior
          industry is experiencing a bloom in profits, being top 10 most
          purchased products on e-commerce platforms, according to VECOM. The
          profit was estimated to be 478 million dollars in 2019, and the growth
          rate was projected to be 13,5% in the 2019-2023 period (Statista).
          With almost 5 billion dollars in total market value in 2019 (HAWA),
          users around Vietnam have become more interested in designing their
          own house with custom interior design.
        </Typography>
        <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Competitive Advantages
        </Typography>
        <Typography variant="body1" gutterBottom>
          With the digitalization of the current world, especially after Covid
          19, contactless communication between the retailers and customers is
          implemented globally. This helps to minimize both parties’ efforts in
          reaching the deal, and for customers to analyze our products
          beforehand effectively, further reduces any overhead left behind by
          using conservative ways of selling interiors. This leads our
          e-commerce to be able to take advantage of this digitalization.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2, mb: 8 }}
        >
          <Link
            to="/shop"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => window.scrollTo(0, 0)}
          >
            Explore more
          </Link>
        </Button>
      </Container>
    </>
  );
};

export default Introduction;
