import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";

import MoreIcon from "@mui/icons-material/MoreVert";
import ListIcon from "@mui/icons-material/List";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Tooltip } from "@mui/material";
import Search from "../common/Search";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createBrowserHistory } from "history";
import { useNavigate,Link } from "react-router-dom";


export default function NavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const routes = {
    'Dashboard':'/'
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [savedBooks, setSavedBooks] = React.useState(0);

  const [currentlyReading, setCurrentlyReading] = React.useState(0);

  React.useEffect(()=>{
    if(localStorage.getItem('savedBooks')){
      var savedBooksCount = Object.keys(JSON.parse(localStorage.getItem("savedBooks"))).length;
      setSavedBooks(savedBooksCount);
    }
    if(localStorage.getItem('currentlyReading')){
      var currentlyReadingCount = Object.keys(JSON.parse(localStorage.getItem("currentlyReading"))).length;
      setCurrentlyReading(currentlyReadingCount);
    }
  })

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (searchVal) =>{
      console.log('searching for: ',searchVal);
      props.onSearch(searchVal);
  }

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  

  const navigateTo = (event)=>{
    console.log(routes[event.target.innerText]);
    props.onNavigate(routes[event.target.innerText]);
  }
  const menuList = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height:90 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Dashboard'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={navigateTo} >
            <ListItemButton id={text} >
              <ListItemIcon>
                {index === 0 ? <DashboardIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} id={text}/>
            </ListItemButton>
          </ListItem>
          
        ))}
      </List>
      <Divider />
      
    </Box>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton >
          <Drawer
            anchor='left'
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {menuList('left')}
          </Drawer>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Taush
          </Typography>
         
          <Box sx={{ flexGrow: 1 }} />
          <Search placeholder="Search Books,Authors.." onSearch={handleSearch}/>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Saved Books">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={savedBooks} color="error">
                  <ListIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Currently Reading">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={currentlyReading} color="error">
                  <MenuBookIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Box>
  );
}
