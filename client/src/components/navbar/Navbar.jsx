import React, { useState, useEffect } from "react";
import { Stack, Typography, Box, IconButton, ButtonGroup } from "@mui/material";
import PrimarySearchAppBar from "../../components/search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MuiDrawer from "./Drawer";

function Navbar({ navbar, setNavbar, active }) {
  const [open, setOpen] = useState(false);

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

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Stack
      direction="row"
      className={navbar ? `navbar ${active}` : "navbar"}
      sx={{ height: { md: "72px", xs: "50px" } }}
    >
      <Typography className="logo" sx={{ width: { md: "10%", xs: "20%" } }}>
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
      <Box sx={{ display: { md: "block", xs: "none" } }}>
        <ul className="link">
          <li className="linkItem">
            {" "}
            <a href="/">Home</a>{" "}
          </li>
          <li className="linkItem">
            <a href="/">Brand</a>
          </li>
          <li className="linkItem">
            <a href="/products">Products</a>
          </li>
          <li className="linkItem">
            <a href="/">Orders</a>
          </li>
        </ul>
      </Box>
      <ButtonGroup>
        <IconButton>
          <AccountCircleIcon sx={{ color: "black", fontSize: "1.3em" }} />
        </IconButton>

        <IconButton>
          <AccountBalanceWalletIcon
            sx={{ color: "black", fontSize: "1.3em" }}
          />
        </IconButton>

        <IconButton>
          <ShoppingCartIcon sx={{ color: "black", fontSize: "1.3em" }} />
        </IconButton>

        <IconButton
          sx={{ display: { md: "none" } }}
          onClick={() => setOpen(true)}
        >
          <DehazeIcon sx={{ color: "black", fontSize: "1.3em" }} />
        </IconButton>
      </ButtonGroup>
      <MuiDrawer
        open={open}
        close={handleDrawerClose}
        handleClose={handleDrawerClose}
      />
    </Stack>
  );
}

export default Navbar;
