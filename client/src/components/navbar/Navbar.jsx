import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Box,
  IconButton,
  ButtonGroup,
  Badge,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Chip,
  Drawer as SearchDrawer,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

import PrimarySearchAppBar from "../../components/search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MuiDrawer from "./Drawer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchIcon from "@mui/icons-material/Search";

function Navbar({ navbar, setNavbar, active, background, border }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Drawer, setDrawer] = React.useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const { user, loading } = useSelector((state) => state.auth);

  // Navbar scroll change background color function
  const changeBackground = () => {
    if (window.scrollY >= 72) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  const handleMobileSearch = () => {
    setOpenSearch(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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

  const handleCartNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/cart");
  };
  const handleProductNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/products");
  };
  const handleBrandNav = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/brands");
  };
  const handleHomeNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/");
  };
  const handleProfileNav = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/me");
  };
  const handleSIgnUp = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/sign-up");
  };
  const handleSignIn = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/sign-in");
  };
  const handleOrderNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/orders/me");
  };
  const handleAdminNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/dashboard");
  };
  const handleSellerNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/dashboard");
  };
  const bookNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/books");
  };
  const newBookNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/newBook");
  };
  const OrderNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/orders");
  };
  const userNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/users");
  };
  const sellerNavigate = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/admin/sellers");
  };
  const dashboardNav = () => {
    if (Drawer) {
      setDrawer(false);
    }
    navigate("/dashboard");
  };
  const logoutHandler = () => {
    if (Drawer) {
      setDrawer(false);
    }
    dispatch(logout());
    navigate("/");
    setOpen(true);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      sx={{ padding: "0 !important", margin: "0 !important", width: "100%" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <List sx={{ padding: "0" }}>
        {user && !loading ? (
          <>
            {user?.role === "seller" ||
              (user.role === "admin" && (
                <ListItem disablePadding>
                  <ListItemButton onClick={dashboardNav}>
                    <ListItemIcon>
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "white" }}>
                          <DashboardRoundedIcon color="warning" />
                        </Avatar>
                      </ListItemAvatar>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" secondary={user.role} />
                  </ListItemButton>
                </ListItem>
              ))}

            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleProfileNav}>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar alt={user.name} src={user?.avatar?.url} />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary={user.name} secondary="view Profile" />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem disablePadding onClick={logoutHandler}>
              <ListItemButton>
                <Typography color="warning">logout</Typography>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSIgnUp}>
                <ListItemIcon>
                  <ListItemAvatar></ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignIn}>
                <ListItemIcon>
                  <ListItemAvatar></ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        )}
      </List>
    </Menu>
  );
  return (
    <Stack
      direction="row"
      className={navbar ? `navbar ${active}` : "navbar"}
      sx={{
        height: { md: "10vh" },
        zIndex: "999",
        background: background,
        borderBottom: border ? ".2px solid " : "",
      }}
    >
      <Typography
        onClick={() => navigate("/")}
        className="logo"
        sx={{ width: { md: "10%", xs: "20%" }, cursor: "pointer" }}
      >
        Atlas
      </Typography>

      <Box
        className="searchBox"
        sx={{
          width: { md: "40% !important", xs: "70% !important" },
          display: { xl: "block", md: "block", xs: "none" },
        }}
      >
        <PrimarySearchAppBar />
      </Box>

      <Box
        sx={{
          display: { md: "flex", xs: "none" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul className="link" style={{ width: "100%" }}>
          <li className="linkItem">
            {" "}
            <a href="/">Home</a>{" "}
          </li>

          <li className="linkItem">
            <a href="/brands">Brands</a>
          </li>

          <li className="linkItem">
            <a href="/products">Products</a>
          </li>

          <li className="linkItem">
            <a href="/orders/me">Orders</a>
          </li>
        </ul>
      </Box>

      <ButtonGroup sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            display: { md: "none", xs: "block" },
            "&:focus": { outline: "none" },
          }}
          onClick={handleMobileSearch}
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
        >
          <SearchIcon sx={{ color: "black", fontSize: "1.3em" }} />
        </IconButton>
        {!user && (
          <IconButton
            sx={{ "&:focus": { outline: "none" } }}
            onClick={handleProfileMenuOpen}
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
          >
            <AccountCircleIcon sx={{ color: "black", fontSize: "1.3em" }} />
          </IconButton>
        )}

        {user && !loading && (
          <Chip
            // sx={{ display: { md: "block", xs: "none" } }}
            onClick={handleProfileMenuOpen}
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            avatar={<Avatar alt={user.name} src={user?.avatar?.url} />}
            label={`${user.name}`}
            variant="outlined"
            sx={{ fontSize: "10px" }}
          />
        )}

        <IconButton
          onClick={() => {
            navigate("/cart");
          }}
          sx={{ "&:focus": { outline: "none" } }}
        >
          <Badge
            badgeContent={cartItems ? cartItems.length : "0"}
            sx={{ color: "rgb(24, 104, 183)" }}
            color="secondary"
          >
            <ShoppingCartIcon sx={{ color: "black", fontSize: "1.3em" }} />
          </Badge>
        </IconButton>

        <IconButton
          sx={{ display: { md: "none" }, "&:focus": { outline: "none" } }}
          onClick={() => setOpen(true)}
        >
          <DehazeIcon sx={{ color: "black", fontSize: "1.3em" }} />
        </IconButton>
      </ButtonGroup>
      <MuiDrawer
        open={open}
        close={handleDrawerClose}
        handleClose={handleDrawerClose}
        productNav={() => {
          handleProductNavigate();
        }}
        brandNav={() => handleBrandNav()}
        cartNav={() => {
          handleCartNavigate();
        }}
        profileNav={() => {
          handleProfileNav();
        }}
        logOutNav={() => {
          logoutHandler();
        }}
        signUpNav={() => {
          handleSIgnUp();
        }}
        dashboard={() => dashboardNav()}
        orderNav={() => handleOrderNavigate()}
        homeNav={() => handleHomeNavigate()}
        signInNav={() => handleSignIn()}
        adminNav={() => handleAdminNavigate()}
        sellerNav={() => handleSellerNavigate()}
        adminBookNav={() => bookNavigate()}
        newBookNavigate={() => newBookNavigate()}
        OrderNavigate={() => OrderNavigate()}
        userNavigate={() => userNavigate()}
        sellerNavigate={() => sellerNavigate()}
      />
      <SearchDrawer anchor="top" open={openSearch}>
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{
            overFlow: "hidden",
            padding: "5px ",
            width: "98%",
          }}
        >
          <PrimarySearchAppBar />
          <IconButton onClick={() => setOpenSearch(false)}>
            <CloseIcon sx={{ fontWeight: "900", color: "black" }} />
          </IconButton>
        </Stack>
      </SearchDrawer>
      {renderMenu}
    </Stack>
  );
}

export default Navbar;
