import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChairIcon from '@mui/icons-material/Chair';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/Interior-logo.png";
const drawerWidth = 240;
const itemList = [
  {
    label: "Clients",
    Icon: PeopleAltIcon,
    href: 'clients'
  },
  // {
  //   label: "Accounts",
  //   Icon: AccountCircleIcon,
  //   href: 'accounts'
  // },
  {
    label: "Designs",
    Icon: DesignServicesIcon,
    href: 'designs'
  },
  {
    label: "Furnitures",
    Icon: ChairIcon,
    href: 'furnitures'
  },
  {
    label: "Materials",
    Icon: ViewComfyIcon,
    href: 'materials'
  },
  {
    label: "Colors",
    Icon: ColorLensIcon,
    href: 'colors'
  },
  {
    label: "Request Refund",
    Icon: RequestPageIcon,
    href: 'refunds'
  },
  {
    label: "Refund Order",
    Icon: ArticleIcon,
    href: 'orders'
  },
  {
    label: "Contracts",
    Icon: EditNoteIcon,
    href: 'contracts'
  },
]

export default function PermanentDrawerLeft() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <img src={Logo} style={{ width: '100%', height: '10rem' }} alt="logo" />

        <Divider color='black' sx={{ mt: 2 }} />
        <List>
          {itemList.map((item, index) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton selected={pathname.includes(item.href)} onClick={() => { navigate(item.href) }}>
                <ListItemIcon>
                  <item.Icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider color='black' sx={{ mt: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              navigate('/login'); localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
}