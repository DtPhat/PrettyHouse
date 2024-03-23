import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import { convertSlugToTitle } from "../../utils";
import { ROOM_IDS } from "../../constants";

const LivingRoomPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const { state } = useLocation();
  // const roomId = state?.roomId;
  const {roomClassification} = useParams()
  const classificationId = ROOM_IDS[roomClassification]
  const navigate = useNavigate()
  const fetchData = async (page) => {
    try {
      setData(null);
      const response = await axiosJWT.get(`https://kietpt.vn/api/design?page=${page}&classificationId=${classificationId}`);
      const data = response.data;
      return data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(currentPage)
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, [currentPage, roomClassification]);
  console.log(data)

  const handlePageChange = (e, page) => {
    setData(null);
    setCurrentPage(page);
  };

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
    window.scrollTo(0,0);
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

  const { designs, page, totalPages } = data;
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://www.ikea.com/images/link-to-comfortable-cozy-ideas-for-small-living-rooms-image--7047a33a658ae7a6174d994cd54af7dd.jpg?f=xxxl",
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
            justifyContent: "end",
            float: "right",
            height: "100%",
            padding: "3rem",
          }}
        >
          <h3>{convertSlugToTitle(roomClassification)}</h3>
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
            <Typography sx={{ fontWeight: "600" }}>{convertSlugToTitle(roomClassification)}</Typography>
          </Breadcrumbs>
        </section>
      </div>
      <Container style={{ margin: "0 60px" }}>
        <Box sx={{ flexGrow: 1, padding: "3rem 0", width: "90vw" }}>
          <Grid container spacing={2}>
            {designs.map((design) => (
              <Grid
                item
                key={design._id}
                xs={6}
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
                    image={design.designURL}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {design.designName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {design.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ padding: "18px" }}>
                      <Button
                        variant="outlined"
                        style={{
                          border: "1px solid black",
                          color: "black",
                        }}
                        size="small"
                        onClick={() => navigate(`/designs/${design.designName.toLowerCase().replace(/\s/g, '-')}`, {state:{ designId: design._id }})}
                      >
                        View Details
                      </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            size="large"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2.5rem",
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default LivingRoomPage;