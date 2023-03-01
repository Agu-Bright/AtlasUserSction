import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Grid,
  List,
  Paper,
  ListItemButton,
  Pagination,
  ListItemText,
  Divider,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/navbar/Sidebar";
import "../../app.scss";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
  SET_DASHBOARD,
  SET_CUSTOMERS,
  SET_ORDERS,
  SET_PRODUCTS,
} from "../../redux/reducers/highlightReducer";
import SidebarDrawer from "../../components/navbar/SidebarBrawer";
function Dashboard() {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch({ type: SET_DASHBOARD });
  });
  const toggle = () => {
    setState((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={true}
      />
      <Box
        sx={{
          paddingTop: { md: "12.2vh", xs: "9vh" },
          backgroundColor: "white",
          margin: "0px !important",
          height: "calc(100vh - 12.2vh)",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            height: "inherit",
            width: "100%",
          }}
        >
          <Box
            sx={{
              borderRight: "0.1px solid gray",
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            {" "}
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", padding: "0" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{
                    margin: "5px",
                    "&:focus": {
                      outline: "none",
                    },
                    display: { md: "block", ms: "none", xs: "none" },
                  }}
                  onClick={toggle}
                >
                  {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                </IconButton>
                <IconButton
                  sx={{
                    margin: "5px",
                    "&:focus": {
                      outline: "none",
                    },
                    display: { md: "none", sm: "block", xs: "block" },
                  }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <ArticleIcon sx={{ fontSize: "1.2em" }} />
                </IconButton>
                <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                  Dashboard
                </Typography>
              </Box>
              <Stack
                spacing={2}
                direction={{ md: "row", sm: "row", xs: "column" }}
                sx={{
                  marginTop: { md: "", sm: "10px", xs: "10px" },
                  padding: { md: "15px", sm: "0px", xs: "0px" },
                  width: { md: "98%", ms: "100%", xs: "100%" },
                  display: { md: "flex", sm: "flex", xs: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    boxShadow: 5,
                    background: "#2eb8f6",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "50",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Total Amount
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AccountBalanceWalletIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        &#8358;20000
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    boxShadow: 5,
                    background: "#f62e4d",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "50",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Orders
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        &#8358;20000
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    boxShadow: 5,
                    background: "#28df93",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "50",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Products
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LocalMallIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        &#8358;20000
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: { md: "25%", sm: "90%", xs: "90%" },
                    height: { md: "150px", sm: "200px", xs: "200px" },
                    borderRadius: "10px",
                    boxShadow: 5,
                    background: "#cb28df",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "50",
                      fontSize: "1.3em",
                      color: "white",
                      padding: "3px",
                    }}
                  >
                    Out of Stock
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{
                      padding: "10px 10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ProductionQuantityLimitsIcon
                      sx={{ fontSize: "90px", opacity: ".5", color: "white" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.3em",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        &#8358;20000
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </>
  );
}

export default Dashboard;
