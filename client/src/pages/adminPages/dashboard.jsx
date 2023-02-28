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
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/navbar/Sidebar";
import "../../app.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_DASHBOARD,
  SET_CUSTOMERS,
  SET_ORDERS,
  SET_PRODUCTS,
} from "../../redux/reducers/highlightReducer";
function Dashboard() {
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(true);
  useEffect(() => {
    dispatch({ type: SET_DASHBOARD });
  });
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
          }}
        >
          <Box sx={{ borderRight: "0.1px solid gray", width: "20%" }}>
            {" "}
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "80%",
              overflowY: "scroll",
              paddingRight: "10px",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "600", fontSize: "1.3em" }}>
                Dashboard
              </Typography>
              <Stack
                direction={{ md: "row", sm: "row", xs: "column" }}
                sx={{ border: "1px solid black", padding: "15px" }}
              >
                <Box> hello</Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Dashboard;
