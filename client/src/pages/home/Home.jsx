import { Box, Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Swiper from "../../components/swiper/Swiper";
import CardSlider from "./cardSlider/CardSlider";
import Trending from "./trending/Trending";
import { getBrandsInLocation } from "../../redux/actions/brandAction";
import { useDispatch, useSelector } from "react-redux";
import BrandCard from "../../components/cardComponent/brandCard";
const CenterDiv = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
function Home() {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, brandsInLocation, resturantsInLocation } = useSelector(
    (state) => state.brandsInLocationReducer
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getBrandsInLocation());
  }, [dispatch]);
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
            <Divider sx={{ color: "black" }} />
            {brandsInLocation && user && (
              <CardSlider data={brandsInLocation} />
            )}{" "}
            {!user && (
              <Typography
                sx={{
                  textAlign: "center",

                  lineHeight: "1.5em",
                }}
              >
                <span
                  onClick={() => navigate("/sign-up")}
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                    color: "rgb(24, 104, 183)",
                    fontWeight: "800",
                  }}
                >
                  SignUp
                </span>{" "}
                <span style={{ fontSize: "1.3em", fontWeight: "700" }}>
                  to view Stores in your location
                </span>
              </Typography>
            )}
          </div>

          <div className="card-container">
            <Typography className="card-topic">
              Resturants in your location
            </Typography>
            <Divider sx={{ color: "black" }} />

            {resturantsInLocation && user && (
              <CardSlider data={resturantsInLocation} />
            )}
            {!user && (
              <Typography
                sx={{
                  textAlign: "center",

                  lineHeight: "1.5em",
                }}
              >
                <span
                  onClick={() => navigate("/sign-up")}
                  style={{
                    fontSize: "2em",
                    cursor: "pointer",
                    color: "rgb(24, 104, 183)",
                    fontWeight: "800",
                  }}
                >
                  SignUp
                </span>{" "}
                <span style={{ fontSize: "1.3em", fontWeight: "700" }}>
                  to view Resturants in your location
                </span>
              </Typography>
            )}
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
