import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import PhoneInTalk from "@mui/icons-material/PhoneInTalk";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Cart } from "react-bootstrap-icons";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Drawer,
  Grid,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Interior-logo.png";
import axiosJWT from "../../api/ConfigAxiosInterceptor";
import ProductSearch from "./ProductSearch";
import { useSelector } from "react-redux";
import { selectCartAmount } from "../../redux/cart/cartSlice";

const Navigation = () => {
  const cartAmount = useSelector(selectCartAmount)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('accessToken') !== null);
  // console.log('check loi', localStorage.getItem('accessToken'));

  const [openCart, setOpenCart] = useState({
    right: false,
  });
  const [openDrawer, setOpenDrawer] = useState({
    left: false,
  });
  const [openProductMenu, setOpenProductMenu] = useState(false);
  const [productData, setProductData] = useState([]);
  const [openRoomMenu, setOpenRoomMenu] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElLogout, setAnchorElLogout] = useState(null);
  const [openLogoutMenu, setOpenLogoutMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setOpenLogoutMenu(false);
    navigate('/signin')
  };

  const handleLogoutMenuOpen = (event) => {
    setAnchorElLogout(event.currentTarget);
    setOpenLogoutMenu(true);
  };
  const handleLogoutMenuClose = () => {
    setAnchorElLogout(null);
    setOpenLogoutMenu(false);
  };

  const renderLogoutMenu = (
    <Menu
      id="logout-menu"
      anchorEl={anchorElLogout}
      open={openLogoutMenu}
      onClose={handleLogoutMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );
  const toggleCart = (anchor, open) => (event) => {
    navigate('/cart')
    return;
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    // setOpenCart({ ...openCart, [anchor]: open });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer({ ...openDrawer, [anchor]: open });
  };
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('accessToken') !== null);
  }, [localStorage.getItem('accessToken')]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cart = () => (
    <Box sx={{ width: 300 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        Cart
      </Typography>
      <Divider />
      <Typography sx={{ textAlign: "center" }}>No item in the cart</Typography>
    </Box>
  );

  const list = () => (
    <Box sx={{ width: "300px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Sofa and Armchair
        </AccordionSummary>
        <AccordionDetails>
          <ListItem>Sofa</ListItem>
          <ListItem>Corner Sofa</ListItem>
          <ListItem>Armchair</ListItem>
          <ListItem>Benches and stools</ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>Table</AccordionSummary>
        <AccordionDetails>
          <ListItem>Dinner Table</ListItem>
          <ListItem>Corner Table</ListItem>
          <ListItem>Working Table</ListItem>
          <ListItem>Bedside Table</ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>Chair</AccordionSummary>
        <AccordionDetails>
          <ListItem>Dinner Chair</ListItem>
          <ListItem>Outdoor Chair</ListItem>
          <ListItem>Working Chair</ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>Bed</AccordionSummary>
        <AccordionDetails>
          <ListItem>Bed</ListItem>
          <ListItem>Bedside Table</ListItem>
          <ListItem>Mattress</ListItem>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          Cabinets and Shelves
        </AccordionSummary>
        <AccordionDetails>
          <ListItem>TV Cabinet</ListItem>
          <ListItem>Wall Cabinet</ListItem>
          <ListItem>Bookshelf</ListItem>
          <ListItem>Wardrobe</ListItem>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
  const handleProductOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenProductMenu(true);
  };

  const handleProductClose = () => {
    setAnchorEl(null);
    setOpenProductMenu(false);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosJWT.get(
          "https://kietpt.vn/api/classification?type=product"
        );
        const data = response.data;
        // const productObj = {}
        // data?.data.map(item => {
        //   productObj[item.classificationName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]+/g, "")] = item._id
        // })
        // console.log(JSON.stringify(productObj))
        setProductData(
          data.data.map((product) => {
            return {
              ...product,
              slugProductUrl: product.classificationName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]+/g, ""),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProductData();
  }, []);

  const handleRoomOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenRoomMenu(true);
  };

  const handleRoomClose = () => {
    setAnchorEl(null);
    setOpenRoomMenu(false);
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosJWT.get(
          "https://kietpt.vn/api/classification?type=room"
        );
        const data = response.data;
        setRoomData(
          data.data.map((room) => {
            // Create slug URL inline for clarity:
            return {
              ...room,
              slugRoomUrl: room.classificationName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]+/g, ""),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRoomData();
  }, []);

  const { pathname } = useLocation()
  if (pathname.includes('admin')) {
    return <></>;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "0", height: "60px" }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            color: "gray",
            padding: "4px 20px",
            opacity: "0.8",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                fontSize: "18px",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link
                to="/introduction"
                style={{
                  color: "black",
                  textDecoration: "none",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                Introduction
              </Link>
              <Link
                to="/promotion"
                style={{
                  color: "black",
                  textDecoration: "none",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                Promotion
              </Link>
              <Link
                to="/policy"
                style={{
                  color: "black",
                  fontWeight: '500',
                  textDecoration: "none",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                Warranty Policy
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PhoneInTalk />
              <Typography sx={{ padding: "0 10px" }}>
                Call us: 1900 0019
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton size="large" color="inherit">
                <MailIcon />
              </IconButton>
              <IconButton
                size="large"
                
                aria-label="open cart"
                style={{ position: "relative" }}
                onClick={toggleCart("right", true)}
              >
                {/* <Badge badgeContent={cartAmount} color="error"> */}
                <span style={{position: "absolute", width: '2px', height: '2px', fontSize:'20px', color:'red', top: '0', right: 16, fontWeight: 700}}>{cartAmount}</span>
                  {/* <ShoppingCartIcon fontSize='large' /> */}
                <Cart />
                {/* </Badge> */}
              </IconButton>
              <Drawer
                anchor="right"
                open={openCart.right}
                onClose={toggleCart("right", false)}
              >
                {cart("right")}
              </Drawer>
              <>
                {/* Phần AppBar và Toolbar */}
                <Box sx={{ display: "flex", flexGrow: 1 }}>
                  <div>
                    {isLoggedIn && (
                      <>
                        <IconButton
                          size="large"
                          onClick={handleLogoutMenuOpen}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                        {/* Render menu Logout */}
                        {renderLogoutMenu}
                      </>
                    )}
                    {!isLoggedIn && (
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="signin"
                      >
                        <AccountCircle />
                      </IconButton>
                    )}
                  </div>
                </Box>
              </>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar
          position={visible ? "fixed" : "static"}
          sx={{
            backgroundColor: "white",
            padding: "10px 20px",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="gray"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              sx={{ display: { sm: "flex", md: "none" }, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={openDrawer.left}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
            <Toolbar>
              <Link
                to="/"
                style={{
                  display: { xs: "none", sm: "block" },
                  textDecoration: "none",
                  fontSize: "24px",
                  color: "black",
                  padding: visible ? "8px 0px" : "",
                }}
              >
                <img
                  src={Logo}
                  style={{ width: "98px", height: "64px" }}
                  alt="logo"
                />
              </Link>
            </Toolbar>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Toolbar>
                <Button
                  id="basic-button"
                  onClick={() => navigate("/shop")}
                  sx={{
                    color: "black",
                    mr: 3,
                    background:
                      "linear-gradient(to top, white 50%, #dee0e0 50%) bottom",
                    backgroundSize: "100% 200%",
                    transition: "0.3s ease-out",
                    "&:hover": {
                      backgroundPosition: "top",
                      transform: "scale(1.02)",
                      transition: "0.3s ease-in-out",
                    },
                  }}
                >
                  Product
                  <ArrowDropDownIcon onMouseOver={handleProductOpen} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openProductMenu}
                  onClose={handleProductClose}
                  sx={{
                    marginTop: "54px",
                    boxShadow: "none",
                    transform: "translateX(-30px)",
                    maxWidth: "1200px",
                  }}
                  MenuListProps={{
                    onMouseLeave: handleProductClose,
                    "aria-labelledby": "basic-button",
                    sx: {
                      padding: "18px",
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    {productData.map((product) => (
                      <Grid item md={3} sm={4} key={product.id}>
                        <Link
                          to={`${product.slugProductUrl}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <MenuItem>{product.classificationName}</MenuItem>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Menu>
                <Button
                  id="basic-button"
                  sx={{
                    color: "black",
                    mr: 3,
                    background:
                      "linear-gradient(to top, white 50%, #dee0e0 50%) bottom",
                    backgroundSize: "100% 200%",
                    transition: "0.3s ease-out",
                    "&:hover": {
                      backgroundPosition: "top",
                      transform: "scale(1.02)",
                      transition: "0.3s ease-in-out",
                    },
                  }}
                >
                  Room
                  <ArrowDropDownIcon onMouseOver={handleRoomOpen} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openRoomMenu}
                  onClose={handleRoomClose}
                  sx={{ marginTop: "20px", boxShadow: "none" }}
                  MenuListProps={{
                    onMouseLeave: handleRoomClose,
                    "aria-labelledby": "basic-button",
                    sx: {
                      padding: "18px",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      {roomData.map((room) => (
                        <Link
                          to={`rooms/${room.slugRoomUrl}`}
                          // state={{ roomId: room._id }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <MenuItem>{room.classificationName}</MenuItem>
                        </Link>
                      ))}
                    </Grid>
                  </Grid>
                </Menu>
                {/* <Button
                  sx={{
                    color: "black",
                    mr: 3,
                    background:
                      "linear-gradient(to top, white 50%, #dee0e0 50%) bottom",
                    backgroundSize: "100% 200%",
                    transition: "0.3s ease-out",
                    "&:hover": {
                      backgroundPosition: "top",
                      transform: "scale(1.02)",
                      transition: "0.3s ease-in-out",
                    },
                  }}
                >
                  Collection
                </Button> */}
                <Button
                  onClick={()=> navigate('/contracts')}
                  sx={{
                    color: "black",
                    mr: 3,
                    background:
                      "linear-gradient(to top, white 50%, #dee0e0 50%) bottom",
                    backgroundSize: "100% 200%",
                    transition: "0.3s ease-out",
                    "&:hover": {
                      backgroundPosition: "top",
                      transform: "scale(1.02)",
                      transition: "0.3s ease-in-out",
                    },
                  }}
                >
                  Contract
                </Button>
              </Toolbar>
            </Box>
            <Box
              sx={{
                display: { sm: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {/* <TextField
                label="Find Product"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ color: "black", cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    width: { md: "350px" },
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: 1,
                    "&:hover": {
                      boxShadow: 3,
                    },
                  },
                }}
              /> */}
              <ProductSearch />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navigation;
