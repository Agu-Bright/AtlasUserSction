import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Footer from "../../components/footer/Footer";

import Navbar from "../../components/navbar/Navbar";
import Swiper from "../../components/swiper/Swiper";
import CardSlider from "./cardSlider/CardSlider";
import Trending from "./trending/Trending";

const CenterDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Home() {
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <Navbar navbar={navbar} setNavbar={setNavbar} active="active" />
      <div className="body">
        <div className="Header">
          <Box
            className="theme-container"
            sx={{
              ...CenterDiv,
            }}
          >
            <Typography
              className="theme"
              sx={{ fontSize: { xl: "45px", md: "40px", xs: "30px" } }}
            >
              Explore Stores And Resturants
            </Typography>
          </Box>
          <Swiper />
        </div>

        <Box
          sx={{
            background: "white",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            padding: { md: "15px 20px", xs: "10px 0px" },
          }}
        >
          <Trending />
        </Box>

        <Box>
          <div className="card-container">
            <Typography className="card-topic">
              Stores in your location
            </Typography>
            <CardSlider />
          </div>

          <div className="card-container">
            <Typography className="card-topic">
              Resturants in your location
            </Typography>
            <CardSlider />
          </div>
        </Box>
      </div>
      <div className="footer" style={{ oveflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
}

export default Home;
